import BaseQuery from '../../Architecture/baseQuery.js';
import CountryDTO from '../../../Shared/DTO/Country/CountryDTO.js'
import CityService from '../../Services/cityService.js';
import ReverseGeoDTO from './../../../Shared/DTO/City/ReverseGeoDTO.js'
import CountryService from '../../Services/countryService.js';

export default class ReverseGeocodeQuery extends BaseQuery {

    /**
  * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, cityServiceDI:CityService ,countryServiceDI:CountryService ,authInfrastructureDI:AuthInfrastucture}}
  * @memberof GetCountriesQuery
  */
    constructor({ logFileInfrastructureDI, cityServiceDI, authInfrastructureDI, countryServiceDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });
        this.cityServiceDI = cityServiceDI;
        this.countryServiceDI = countryServiceDI

    };
    init(dto) {
        this.model = Object.assign(new ReverseGeoDTO(), dto);;
    }

    async action() {
        let reverseResult = await this.cityServiceDI.setContext(this.context).getReverse({ address: this.model.address, city: this.model.city, country: this.model.country });
       return reverseResult;
    }
};
