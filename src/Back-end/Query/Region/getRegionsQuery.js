import BaseQuery from '../../Architecture/baseQuery.js';
import CountryDTO from '../../../Shared/DTO/Country/CountryDTO.js'
import CountryService from '../../Services/countryService.js';
import RegionService from '../../Services/regionService.js';
import RegionDTO from '../../../Shared/DTO/Region/RegionDTO.js';


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
        this.model = Object.assign(new RegionDTO(), dto);;
    }

    async action() {
        console.log(this.regionServiceDI)
        return await this.regionServiceDI.setContext(this.context).getRegions({region:this.model});
    }
};
