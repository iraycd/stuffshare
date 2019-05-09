import BaseRepository from "../Architecture/baseRepository.js";
import ServerException from "../Architecture/Exceptions/serverException.js";
import SequelizeDB from "../Database/models/index.js";
import UserDTO from "../../Shared/DTO/User/UserDTO.js";
import Users from "../Database/models/user.js";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class UserAuthRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof UserRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.UserAuths);
    this.UserAuths = sequelizeDI.UserAuths;
    this.sequelizeDI = sequelizeDI;
  }

  

}
