import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ItemDTO from '../../../Shared/DTO/Item/ItemDTO.js';
import BlobService from '../../Services/blobService.js';
import BlobBase64DTO from '../../../Shared/DTO/Blob/BlobBase64DTO.js';


export default class GetItemQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService }}
     * @memberof GetItemQuery
     */
    constructor({ logFileInfrastructureDI, itemServiceDI, authInfrastructureDI, blobServiceDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });
        this.authInfrastructureDI.allowAnonymous();
        this.itemServiceDI = itemServiceDI;
        this.blobServiceDI = blobServiceDI;

    };

    init(dto) {
        this.model = Object.assign(new ItemDTO(), dto);
    }

    async action() {

        let resultList = await this.itemServiceDI.setContext(this.context).getItem({ uids: [this.model.uid] });
        resultList = resultList.map(async result => {
            if (result.blobs.length > 0) {
                console.log(result);
                let blobsResulst = await Promise.all(result.blobs.map(async item => {
                    return await this.blobServiceDI.getBlobsBase64ByGuids({
                        ids: [item.blob_min.id]
                    });
                }));
                // let blobBase64 = blobsResulst.filter(element => {
                //     return result.blobs.blob_thumbmail.id == element.id
                // })[0]
                result.blobs = result.blobs.map(item => {
                    let blobBase64 = blobsResulst.filter(element => {
                     
                        return item.blob_min.id == element[0].id
                    })[0]
                    item.blob_min = Object.assign(new BlobBase64DTO(), blobBase64[0]);
                    return item;
                })
                return result;
            }
            return result;

        })
        return await Promise.all(resultList);

    }
};
