import BaseQuery from '../../Architecture/baseQuery.js';
import UserDTO from '../../../Shared/DTO/User/UserDTO.js';
import UserLoginInternalDTO from './../../../Shared/DTO/User/UserLoginInternalDTO.js'
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ServerException from '../../Architecture/Exceptions/serverException.js';
import UserService from '../../Services/userService.js';
import AuthInfrastucture from '../../Architecture/Infrastructure/authInfrastucture.js';



export default class GetRefreshTokenQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });

        this.userServiceDI = userServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new UserDTO(), dto);;
    }

    async action() {
        return await this.userServiceDI.setContext(this.context).getRefreshToken();

    }
};
