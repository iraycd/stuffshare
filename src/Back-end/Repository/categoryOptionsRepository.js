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
    this.categoryOptionsTypeTemplateDB = sequelizeDI.CategoryOptionsTypeTemplate;
    this.categoryOptionDB = sequelizeDI.CategoryOption
    this.categoryOptionsTemplateDB = sequelizeDI.CategoryOptionsTemplate

    this.sequelizeDI = sequelizeDI;
  }
  getTypes({ transaction }) {
    return this.categoryOptionsTypeDB.findAll({
      where: {
        status: 1
      },
      order: [['type', 'ASC'], ['name', 'ASC']]
      ,
      include: [
        {
          model: this.sequelizeDI.CategoryOptionsTypeTemplate,
          as: "cat_options_type_temp"
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
  getRelatedOptions({ category_ids, transaction }) {
    return this.categoryOptionDB.findAll({
      // where: { category_id: category_ids },
      order: [['name', 'ASC'], ['cat_opt_temp', 'value', 'ASC']],
      include: [
        {
          model: this.sequelizeDI.CategoryOptionsLink,
          as: "category_link",
          required: true,
          where: {
            category_id: category_ids
          },
        },
        {
          model: this.sequelizeDI.CategoryOptionsType,
          as: "cat_opt",
          required: true,
          where: {
            status: 1
          },
          include: [
            {
              model: this.sequelizeDI.CategoryOptionsTypeTemplate,
              as: "cat_options_type_temp"

              /* include: [{
                 model: this.sequelizeDI.Category,
                 as: "category_children"
               }
               ]*/
            },


          ],          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_children"
           }
           ]*/
        },
        {
          model: this.sequelizeDI.CategoryOptionsTemplate,
          as: "cat_opt_temp",

          include: [{
            model: this.sequelizeDI.CategoryOptionsTypeTemplate,
            as: "cat_opt_type_template"
          }
          ]
        },

      ],
      transaction: this.getTran({ transaction })
    });
  }


  /**
   *
   * @param  {{ model : BaseDTO}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  upsertTemplate({ model, transaction }) {
    return this.categoryOptionsTemplateDB.upsert(model, {
      transaction: this.getTran({ transaction })
    });
  }

  /**
  *
  * @param  {{ model : BaseDTO}}
  * @return {Promise<any>}
  * @memberof BaseRepository
  */
  deleteTemplate({ model, transaction }) {
    return this.categoryOptionsTemplateDB.destroy({
      where: { id: this.toStr(model.id) },
      transaction: this.getTran({ transaction })
    });
  }


  upsertToCategory({ model, transaction }) {
    return this.sequelizeDI.CategoryOptionsLink.upsert(model, {

      transaction: this.getTran({ transaction })
    });
  }

  getAllCategoriesOption({ id, transaction }) {
    console.log(id);
    let whereClaus = id ? { id: id } : {};

    return this.categoryOptionDB.findAll({
      where: whereClaus,
      order: [['name', 'ASC'], ['cat_opt_temp', 'value', 'ASC']],
      include: [
        {
          model: this.sequelizeDI.CategoryOptionsLink,
          as: "category_link",
          required: false,
          include: [
            {
              model: this.sequelizeDI.Category,
              as: "category"


            },
          ],
        },
        {
          model: this.sequelizeDI.CategoryOptionsType,
          as: "cat_opt",
          required: true,
          where: {
            status: 1
          },
          include: [
            {
              model: this.sequelizeDI.CategoryOptionsTypeTemplate,
              as: "cat_options_type_temp"


            },
          ],
        },
        {
          model: this.sequelizeDI.CategoryOptionsTemplate,
          as: "cat_opt_temp",

          include: [{
            model: this.sequelizeDI.CategoryOptionsTypeTemplate,
            as: "cat_opt_type_template"
          }
          ]
        },

      ],
      transaction: this.getTran({ transaction })
    });
  }


  /**
   *
   * @param  {{ model : BaseDTO}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  upsertCategoryOptionsForCategory({ model, transaction }) {
    return this.sequelizeDI.CategoryOptionsLink.upsert(model, {
      transaction: this.getTran({ transaction })
    });
  }
  removeCategoryOptionsForCategory({ id, transaction }) {
    return this.sequelizeDI.CategoryOptionsLink.destroy({
      where: { id: this.toStr(id) },
      transaction: this.getTran({ transaction })
    });
  }
}

