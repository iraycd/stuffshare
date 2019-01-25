import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ItemDTO from '../../../Shared/DTO/Item/ItemDTO.js';


export default class GetItemQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService }}
     * @memberof GetItemQuery
     */
    constructor({ logFileInfrastructureDI, itemServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });
        this.authInfrastructureDI.allowAnonymous();
        this.itemServiceDI = itemServiceDI;
    };

    init(dto) {
        this.model = Object.assign(new ItemDTO(), dto);
    }

    async action() {

      return await this.itemServiceDI.setContext(this.context).getItem({ uids: [this.model.uid] });
    
    }
};
