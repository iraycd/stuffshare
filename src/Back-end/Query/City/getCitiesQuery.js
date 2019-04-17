import BaseQuery from '../../Architecture/baseQuery.js';
import CountryDTO from '../../../Shared/DTO/Country/CountryDTO.js'
import CityService from '../../Services/cityService.js';


CityService
export default class GetCitiesQuery extends BaseQuery {

    /**
  * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, cityServiceDI:CityService }}
  * @memberof GetCountriesQuery
  */
    constructor({ logFileInfrastructureDI, cityServiceDI }) {
        super({ logFileInfrastructureDI });
        this.cityServiceDI=cityServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new CountryDTO(), dto);;
    }

    async action() {
        console.log(this.countryServiceDI)
        return await this.cityServiceDI.setContext(this.context).getCities({city:this.model});
    }
};
