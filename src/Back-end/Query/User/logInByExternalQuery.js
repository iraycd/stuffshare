import BaseQuery from '../../Architecture/baseQuery.js';
import UserDTO from '../../../Shared/DTO/User/UserDTO.js';
import UserLoginInternalDTO from './../../../Shared/DTO/User/UserLoginInternalDTO.js'
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ServerException from '../../Architecture/Exceptions/serverException.js';
import UserService from '../../Services/userService.js';
import ExternalCredentialsDTO from '../../../Shared/DTO/User/ExternalCredentialsDTO.js';
import axios from 'axios'


export default class LogInByExternalQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService }}
     * @memberof LogInByExternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI }) {
        super({ logFileInfrastructureDI });

        this.userServiceDI = userServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new ExternalCredentialsDTO(), dto);;
    }
    async getApiResult(accessToken, userId, provider) {
        if (provider == 1) {
            return await axios({
                method: 'get',
                url: `https://graph.facebook.com/${userId}?fields=id,name,email,address,gender&access_token=${accessToken}`
            })
        } if (provider == 2) {
            return await axios({
                method: 'get',
                url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
            })
        }

    }
    async action() {
        let externalResult = await this.getApiResult(this.model.token, this.model.userId, this.model.provider);
        return await this.userServiceDI.loginByExternalUserId({ email: externalResult.data.email, externalUserId: externalResult.data.id, provider: this.model.provider });

    }
};
