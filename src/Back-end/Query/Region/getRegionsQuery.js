import BaseQuery from '../../Architecture/baseQuery.js';
import CountryDTO from '../../../Shared/DTO/Country/CountryDTO.js'
import CountryService from '../../Services/countryService.js';
import RegionService from '../../Services/regionService.js';


RegionService
export default class GetRegionsQuery extends BaseQuery {

    /**
  * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, regionServiceDI:RegionService }}
  * @memberof GetRegionQuery
  */
    constructor({ logFileInfrastructureDI, regionServiceDI }) {
        super({ logFileInfrastructureDI });
        this.regionServiceDI=regionServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new CountryDTO(), dto);;
    }

    async action() {
        console.log(this.regionServiceDI)
        return await this.regionServiceDI.setContext(this.context).getRegionByName({country:this.model});
    }
};
