import BaseRepository from "../Architecture/baseRepository.js";
import ServerException from "../Architecture/Exceptions/serverException.js";
import SequelizeDB from "../Database/models/index.js";


/**
 *
 * @export
 * @class CategoryOptionsRepository
 * @extends BaseRepository
 */
export default class CategoryOptionsRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CategoryOptionsRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CategoryOption);
    this.CategoryOptionsTypeDB = sequelizeDI.CategoryOptionsType;
    this.CategoryOptionsTypeTemplateDB = sequelizeDI.CategoryOptionsTypeTemplate
    this.sequelizeDI = sequelizeDI;
  }
  getTypes({ transaction }) {
    return this.entityDAO.findAll({
      where: { id: ids },
      include: [
        {
          model: this.sequelizeDI.Category,
          as: "category_children"
          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_children"
           }
           ]*/
        },
        {
          model: this.sequelizeDI.Category,
          as: "category_parent"
          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_parent"
           }
           ]*/
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }

}
