import BaseQuery from '../../Architecture/baseQuery.js';
import UserDTO from '../../../Shared/DTO/User/UserDTO.js';
import UserLoginInternalDTO from './../../../Shared/DTO/User/UserLoginInternalDTO.js'
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ServerException from '../../Architecture/Exceptions/serverException.js';
import UserService from '../../Services/userService.js';
import AuthInfrastucture from '../../Architecture/Infrastructure/authInfrastucture.js';
import BlobService from '../../Services/blobService.js';
import BlobMapperDTO from './../../../Shared/DTO/Blob/BlobMapperDTO.js'
import BlobDTO from '../../../Shared/DTO/Blob/BlobDTO.js';
import BlobBase64DTO from '../../../Shared/DTO/Blob/BlobBase64DTO.js';


export default class GetUserImagesQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,blobServiceDI:BlobService }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, blobServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });
        this.authInfrastructureDI.allowAnonymous();
        this.blobServiceDI = blobServiceDI;
    };

    init(dto) {
        this.model = Object.assign(new BlobDTO(), dto);
    }

    async action() {

        let result = await this.blobServiceDI.setContext(this.context).getBlobs({ userId: this.model.user_id, itemId: null });
        let uidList = result.map(item => {
            return item.blob_thumbmail.id;
        });
        if(uidList==null || uidList.length==0){
            return result;
        }
        let blobsResulst = await this.blobServiceDI.getBlobsBase64ByGuids({ ids: uidList });
        let combainBlobs = result.map(item => {
            let blobBase64 = blobsResulst.filter(element => {
                return item.blob_thumbmail.id == element.id
            })[0];
            let blobElement = Object.assign(new BlobDTO(), item)
            blobElement.blob_thumbmail = Object.assign(new BlobBase64DTO(), blobBase64);
            return blobElement;
        });
        
        return combainBlobs;


    }
};
