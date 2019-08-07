import BaseQuery from '../../Architecture/baseQuery.js';
import CountryDTO from '../../../Shared/DTO/Country/CountryDTO.js'
import CityService from '../../Services/cityService.js';
import ReverseGeoDTO from './../../../Shared/DTO/City/ReverseGeoDTO.js'
import CountryService from '../../Services/countryService.js';

export default class GeocodeQuery extends BaseQuery {

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
        let reverseResult = await this.cityServiceDI.setContext(this.context).getReverseByLatLng({ latitude: this.model.latitude, longitude: this.model.longitude });
        if (reverseResult.length > 0) {
            let country_result = await this.countryServiceDI.setContext(this.context).getCountryByName({ country: { name: reverseResult[0].country } })
            let city_result = await this.cityServiceDI.setContext(this.context).getCities({ city: { country_id: country_result[0].id, name: reverseResult[0].city } })
            let city = city_result.filter(item => { return item.name == reverseResult[0].city || item.name_clear == reverseResult[0].city });
            if (city.length == 0) {
                city = city_result.filter(item => { return item.name_clob.includes(reverseResult[0].city) });

            }
            reverseResult[0].country_id = country_result[0].id

            if (city.length > 0) {
                reverseResult[0].city_id = city[0].id;
                reverseResult[0].country_id = country_result[0].id

            }
        }

        return reverseResult;


    }
};
