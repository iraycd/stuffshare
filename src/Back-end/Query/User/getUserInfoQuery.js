import BaseQuery from '../../Architecture/baseQuery.js';
import UserDTO from '../../../Shared/DTO/User/UserDTO.js';
import UserLoginInternalDTO from './../../../Shared/DTO/User/UserLoginInternalDTO.js'
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ServerException from '../../Architecture/Exceptions/serverException.js';
import UserService from '../../Services/userService.js';


export default class GetUserInfoQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService }}
     * @memberof GetUserInfoQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });

        this.userServiceDI = userServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new UserDTO(), dto);;
    }

    async action() {
        
        let user_Id = this.model.id>0?this.model.id: this.context.user.id;
        return await this.userServiceDI.setContext(this.context).getUserInfo({ user_id: user_Id });

        

    }
};
