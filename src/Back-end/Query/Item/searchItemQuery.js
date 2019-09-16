import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import SearchItemDTO from '../../../Shared/DTO/Item/SearchItemDTO';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import BlobBase64DTO from '../../../Shared/DTO/Blob/BlobBase64DTO.js';



export default class SearchItemQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService}}
     * @memberof GetItemQuery
     */
    constructor({ logFileInfrastructureDI, itemServiceDI, authInfrastructureDI, elasticSearchServiceDI ,blobServiceDI}) {
        super({ logFileInfrastructureDI, authInfrastructureDI });
        this.authInfrastructureDI.allowAnonymous();
        this.itemServiceDI = itemServiceDI;
        this.elasticSearchServiceDI = elasticSearchServiceDI;
        this.blobServiceDI = blobServiceDI
    };

    init(dto) {
        this.model = Object.assign(new SearchItemDTO(), dto);
    }

    async getItems(uids) {

        let resultList = await this.itemServiceDI.setContext(this.context).getItem({ uids: uids });
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
    async action() {
        console.log(this.model)
        let result = await this.elasticSearchServiceDI.setContext(this.context).searchDoc({
            latitude: this.model.lat,
            longitude: this.model.lon,
            text: this.model.freetext,
            distance: this.model.distance,


        })
        let itemsResult = result.data.hits.hits.map(item => {
            return { item_id: item["_id"], user_id: item["_source"].user_id }
        })
        console.log(itemsResult);
        return await  this.getItems(itemsResult.map(item => { return item.item_id }));
        //return await this.itemServiceDI.setContext(this.context).searchItem({ search: this.model });




    }
};
