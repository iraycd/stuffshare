import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import RegionDTO from "../../Shared/DTO/Region/RegionDTO.js";
import PrepareSearch from "../Architecture/prepareSearch.js";


/**
 *
 * @export
 * @class RegionRepository
 * @extends BaseRepository
 */
export default class RegionRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof RegionRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Country);
    this.sequelizeDI = sequelizeDI;
  }


  /**
   *
   *
   * @param {*} { user_id,country_id, transaction }
    * @return {Promise<RegionDTO[]>}
    *  @memberof RegionRepository
   */
  getRegions({ name_fs, country_id, transaction }) {

    let freetext = PrepareSearch.simplePrepare(name_fs)
    console.log(freetext);
    freetext = freetext != undefined ? freetext : '""';
    let withQuery = [];
    withQuery.push(`regions_prep as
                        (SELECT Regions.* ,
                        0 aS RANK
                        FROM Regions
                        WHERE country_id = ISNULL(:country_id,country_id)
                        )`);


    withQuery.push(
      `search_fts as (
            SELECT t.* FROM (SELECT 
              [KEY],
              ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK],
			  COUNT(*) OVER() as counter
              FROM 
              CONTAINSTABLE (Regions,  
                name_clob,
                :freetext,
                LANGUAGE '${this.context.language == 'pl' ? 'polish' : 'english'}'
                --	20  
              )  		
			) as t
              WHERE 
			  RANK > 70/(case when counter = 0 then 1
			  else  counter end )
					
          )
        `

    )

    let query = `WITH 
                  ${withQuery.join(',')}
                  SELECT c.id,c.name,c.longitude,c.latitude FROM regions_prep c
                  ${freetext.length !="" ? 'JOIN  search_fts fs ON c.id= fs.[KEY]  ORDER BY fs.RANK DESC ,name' : 'ORDER BY name'}`

    console.log(query);
    return this.sequelizeDI.sequelize.query(
      query
      ,
      {
        replacements: {
          freetext: freetext
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }
}
