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
    this.categoryOptionsTypeDB = sequelizeDI.CategoryOptionsType;
    this.categoryOptionsTypeTemplateDB = sequelizeDI.CategoryOptionsTypeTemplate
    this.sequelizeDI = sequelizeDI;
  }
  getTypes({ transaction }) {
    return this.categoryOptionsTypeDB.findAll({
      where: {  },
      include: [
        {
          model: this.sequelizeDI.CategoryOptionsTypeTemplate,
          as: "cat_options_temp"
          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_children"
           }
           ]*/
        },
        
      ],
      transaction: this.getTran({ transaction })
    });
  }

}
