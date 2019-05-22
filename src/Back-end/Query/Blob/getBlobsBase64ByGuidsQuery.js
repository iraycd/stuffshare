import BaseQuery from '../../Architecture/baseQuery.js';
import UserDTO from '../../../Shared/DTO/User/UserDTO.js';
import UserLoginInternalDTO from './../../../Shared/DTO/User/UserLoginInternalDTO.js'
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ServerException from '../../Architecture/Exceptions/serverException.js';
import UserService from '../../Services/userService.js';
import AuthInfrastucture from '../../Architecture/Infrastructure/authInfrastucture.js';
import BlobService from '../../Services/blobService.js';
import BlobMapperDTO from './../../../Shared/DTO/Blob/BlobMapperDTO.js'


export default class GetBlobsBase64ByGuidsQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,blobServiceDI:BlobService }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, blobServiceDI }) {
        super({ logFileInfrastructureDI });

        this.blobServiceDI = blobServiceDI;
    };

    init(dto) {
        this.model = dto.map(item => {
            return Object.assign(new BlobMapperDTO(), item);
        });
    }

    async action() {
        let uidList = this.model.map(item => {
            return item.id;
        })
        return await this.blobServiceDI.getBlobsBase64ByGuids({ ids: uidList });

    }
};
