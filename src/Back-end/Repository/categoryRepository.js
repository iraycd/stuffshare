import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
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

  /**
   *
   *
   * @param {Number} {id}
   * @memberof CategoryRepository
   */
  getCategoryTree({ id, transaction }) {
    return this.entityDAO.findAll({
      where: { id: this.toStr(id) },
      include: [
        {
          model: this.sequelizeDI.Category,
          as: "category_children"
        },
        {
          model: this.sequelizeDI.CategoryHierarchy,
          as: "category_parent"
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

  setAsVerified({id,transaction}){
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

  getCategoryRelated({uids,transaction}){
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
}
