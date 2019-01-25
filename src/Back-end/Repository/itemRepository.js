import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import SearchItemDTO from './../../Shared/DTO/Item/SearchItemDTO.js';
/**
 *
 * @export
 * @class BlobRepository
 * @extends ItemRepository
 */
export default class ItemRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof ItemRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Item);
    this.sequelizeDI = sequelizeDI;
  }

  /**
   *
   *
    * @param {{search: SearchItemDTO}}
   * @returns
   * @memberof ItemRepository
   */
  searchItem({ search, transaction }) {

    //move to dynamic sql !!!
    //create new query for search by ppl
    console.log(this.context);
    let freetext = search.prepareSearch(search.freetext, 1)
    console.log(freetext);
    let checkCategories = search.categoryList.length>0;
    let withQuery = [];
    if (checkCategories) {
      withQuery.push(`get_all_match AS (
          SELECT item_id, COUNT(*) as match_counter FROM ItemCategories 
          WHERE category_id IN (:categories)
          GROUP BY  item_id)`);
      withQuery.push(
        `match_count AS ( SELECT
          get_all_match.item_id,
        (match_counter*100/${search.categoryList.length}) filterCount,
        MAX((match_counter*100/${search.categoryList.length})) OVER( PARTITION BY 1) as Max_MAtch 
        FROM get_all_match
        WHERE 
        (match_counter*100/${search.categoryList.length})>50
        )`)
    }
    if (freetext.length > 1) {
      withQuery.push(
        `search_fts as (
            SELECT t.* FROM (SELECT 
              [KEY],
              ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK]
              FROM 
              CONTAINSTABLE (Items,  
                ${this.context.language == 'pl' ? 'clobSearch_pl' : 'clobSearch_us'}, 
                :freetext,
                LANGUAGE '${this.context.language == 'pl' ? 'polish' : 'english'}'
              --	20  
              )  ) as t
              WHERE RANK > 0 
              
          )`

      )
    }
    if (freetext.length > 1) {
      withQuery.push(`get_results AS (
        SELECT
            Items.*, 
            ${checkCategories?'match_count.Max_MAtch':'0'} AS max_match,
            ${checkCategories?'match_count.filterCount':'0'} AS filter_count,
            COUNT(*) OVER(PARTITION BY 1) as counter,
            
          ${freetext.length>0?'RANK':'1'} AS ft_rank
        FROM Items
        ${checkCategories?'JOIN match_count ON item_id=Items.id':''}
        ${freetext.length>0?'JOIN search_fts ON search_fts.[KEY] = Items.id':''}
         
      )`)

    
    }
    return this.sequelizeDI.sequelize.query(
      `WITH 
        ${withQuery.join(',')}
        SELECT 
        ROW_NUMBER() OVER( ORDER BY MAX(filter_count) DESC,COUNT(get_results.id) DESC,
        MAX(ft_RANK) DESc) AS rnum,
        Users.Id as id,
         Users.name,
          MAX(filter_count) as max,
          COUNT(get_results.id) as number_of_matched,
          COUNT(Users.Id) OVER(PARTITION BY 1) as row_count
         FROM 
        Users
         JOIN  get_results ON user_id=Users.Id
        WHERE 
          100 = (CASE WHEN Max_MAtch=100 then  filter_count else 100 end )
          GROUP BY Users.Id,Users.name
        ORDER BY 
        MAX(filter_count) DESC,
        COUNT(get_results.id) DESC,
        MAX(ft_RANK) DESc
        OFFSET :page_size * (:page_number - 1) ROWS
          FETCH NEXT :page_size ROWS ONLY;`
      ,
      {
        replacements: {
          categories: search.categoryList
          , page_size: search.size
          , page_number: search.page
          , freetext: freetext
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }

  search({ search, transaction }) {

    //move to dynamic sql !!!
    //create new query for search by ppl
    console.log(this.context);
    let freetext = search.prepareSearch(search.freetext, 1)
    console.log(freetext);
    let checkCategories = search.categoryList.length>0;
    let withQuery = [];
    if (checkCategories) {
      withQuery.push(`get_all_match AS (
          SELECT item_id, COUNT(*) as match_counter FROM ItemCategories 
          WHERE category_id IN (:categories)
          GROUP BY  item_id)`);
      withQuery.push(
        `match_count AS ( SELECT
          get_all_match.item_id,
        (match_counter*100/${search.categoryList.length}) filterCount,
        MAX((match_counter*100/${search.categoryList.length})) OVER( PARTITION BY 1) as Max_MAtch 
        FROM get_all_match
        WHERE 
        (match_counter*100/${search.categoryList.length})>50
        )`)
    }
    if (freetext.length > 1) {
      withQuery.push(
        `search_fts as (
            SELECT t.* FROM (SELECT 
              [KEY],
              ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK]
              FROM 
              CONTAINSTABLE (Items,  
                ${this.context.language == 'pl' ? 'clobSearch_pl' : 'clobSearch_us'}, 
                :freetext,
                LANGUAGE '${this.context.language == 'pl' ? 'polish' : 'english'}'
              --	20  
              )  ) as t
              WHERE RANK > 0 
              
          )`

      )
    }
    if (freetext.length > 1) {
      withQuery.push(`get_results AS (
        SELECT
            Items.*, 
            ${checkCategories?'match_count.Max_MAtch':'0'} AS max_match,
            ${checkCategories?'match_count.filterCount':'0'} AS filter_count,
            COUNT(*) OVER(PARTITION BY 1) as counter,
            
          ${freetext.length>0?'RANK':'1'} AS ft_rank
        FROM Items
        ${checkCategories?'JOIN match_count ON item_id=Items.id':''}
        ${freetext.length>0?'JOIN search_fts ON search_fts.[KEY] = Items.id':''}
         
      )`)

    
    }
    return this.sequelizeDI.sequelize.query(
      `WITH 
        ${withQuery.join(',')}
        SELECT 
          ROW_NUMBER() OVER( ORDER BY filter_count DESC) as rnum, 
          COUNT(Id) OVER(PARTITION BY 1) as row_count,
          get_results.*
         FROM get_results 
        WHERE 
          100 = (CASE WHEN Max_MAtch=100 then  filter_count else 100 end )
          AND user_id=ISNULL(:user_id,user_id)
        ORDER BY 
        filter_count DESC,
        ft_RANK DESc
        OFFSET :page_size * (:page_number - 1) ROWS
          FETCH NEXT :page_size ROWS ONLY;`
      ,
      {
        replacements: {
          categories: search.categoryList
          , page_size: search.size
          , page_number: search.page
          , freetext: freetext
          ,user_id: search.user_id
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }


  getItem({ uids, transaction }) {
    console.log('this.userId')
    console.log(this.userId)
    let userId = this.userId;
    return this.entityDAO.findAll({
      where: {
        uid: {
          [SequelizeDB.Sequelize.Op.in]: uids
        }
      },
      include: [
        {
          model: this.sequelizeDI.Category,
          as: "categories"
        },
        {
          model: this.sequelizeDI.Blob,
          as: "blobs",
          required: false,
          where: {
            status: this.sequelizeDI.sequelize.literal(`blobs.status = case when blobs.user_id='${userId ? userId : 0}' then blobs.status else 1 end`)
          },
          include: [
            { model: this.sequelizeDI.BlobMapper, as: "blob_thumbmail" },
            { model: this.sequelizeDI.BlobMapper, as: "blob_item" }
          ]
        } //,
        // {
        //   model: this.sequelizeDI.CategoryHierarchy,
        //   as: "category_parent"
        // }
      ],
      transaction: this.getTran({ transaction })
    });
  }
}
