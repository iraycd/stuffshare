import BaseQuery from '../../Architecture/baseQuery.js';
import CountryDTO from '../../../Shared/DTO/Country/CountryDTO.js'
import CountryService from '../../Services/countryService.js';



export default class GetCountriesQuery extends BaseQuery {

    /**
  * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, countryServiceDI:CountryService }}
  * @memberof GetCountriesQuery
  */
    constructor({ logFileInfrastructureDI, countryServiceDI }) {
        super({ logFileInfrastructureDI });
        this.countryServiceDI=countryServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new CountryDTO(), dto);;
    }

    async action() {
        console.log(this.countryServiceDI)
        return await this.countryServiceDI.setContext(this.context).getCountryByName({country:this.model});
    }
};
