import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import PrepareSearch from "../Architecture/prepareSearch.js";

/**
 *
 * @export
 * @class CategoryRepository
 * @extends BaseRepository
 */
export default class CategoryRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof CategoryRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Category);
    this.sequelizeDI = sequelizeDI;
  }
  getAllCategoriesFlat({transaction})
  {
    return this.sequelizeDI.sequelize.query(
      `
      SELECT category_child_id,category_parent_id,category as title,status,icon,forThing,forSell,forEvent FROM Categories JOIN CategoryHierarchies ON Categories.id = CategoryHierarchies.category_child_id order by category  
      `,
      {
        replacements: {  },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );
  }
  /**
   *
   *
   * @param {Array} {id}
   * @memberof CategoryRepository
   */
  getCategoryTree({ ids, transaction }) {
    return this.entityDAO.findAll({
      where: { id: ids },
      include: [
        {
          model: this.sequelizeDI.Category,
          as: "category_children"
        },
        {
          model: this.sequelizeDI.CategoryHierarchy,
          as: "category_parent",
          include: [{
            model: this.sequelizeDI.Category,
            as: "category_parent"
          }
          ]
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }
  removeCategory({ id, transaction }) {
    return this.entityDAO.destroy({
      where: { id: this.toStr(id), status: 0 },
      transaction: this.getTran({ transaction })
    });
  }

  setAsVerified({ id, transaction }) {
    return this.entityDAO.update(
      {
        status: this.toStr(1)
      },
      {
        where: { id: this.toStr(id) },
        transaction: this.getTran({ transaction })
      }
    );
  }

  getCategoryRelated({ uids, transaction }) {
    return this.sequelizeDI.sequelize.query(
      `
      WITH recus(category_id) AS (
        SELECT category_child_id FROM CategoryHierarchies
        WHERE Category_child_id IN (:uids)
        UNION ALL
        SELECT CategoryHierarchies.category_parent_id  FROM recus JOIN CategoryHierarchies ON category_child_id=recus.category_id
        )
        SELECT  id,category,category_pl,category_us, COUNT(*) FROM recus JOIN Categories ON Id = category_id
        GROUP BY id,category,category_pl,category_us
        
    `,
      {
        replacements: { uids: uids },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );


  }

  getCategoryFreetext({ search, isFor, transaction }) {
    let lang = undefined;
    let freetext = PrepareSearch.prepareSmall(search)
    freetext = freetext != undefined ? freetext : '""';
    switch (this.context.language) {
      case 'pl': lang = 'polish'
      case 'us': lang = 'english'
      case 'de': lang = '1031'
      case 'ru': lang = '1049'
      case 'fr': lang = '1036'
      case 'es': lang = '3082'
      case 'no': lang = '1044'
      case 'zh_cn': lang = '2052'
      default:
        break;
    }
    if (!lang) {
      throw 'UNAUTHORIZED_LANGUAGE'
    }
    return this.sequelizeDI.sequelize.query(
      `
  
        SELECT t.* FROM (SELECT 
          [KEY],
          ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK]
          FROM 
          CONTAINSTABLE (V_Categories_FT,  
            ${'category_' + this.context.language}, 
            :freetext,
            LANGUAGE ${lang}
          --	20  
          )  ) as t
          WHERE RANK > 0 
          
      `,
      {
        replacements: { freetext: freetext },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );


  }
}
