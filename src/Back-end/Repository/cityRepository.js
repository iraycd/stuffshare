import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import CityDTO from "../../Shared/DTO/City/CityDTO.js";
import PrepareSearch from "../Architecture/prepareSearch.js";


/**
 *
 * @export
 * @class CityRepository
 * @extends BaseRepository
 */
export default class CityRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof CityRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Country);
    this.sequelizeDI = sequelizeDI;
  }


  /**
   *
   *
   * @param {*} { user_id,region_id, transaction }
    * @return {Promise<CityDTO[]>}
    *  @memberof CityRepository
   */
  getCities({ name_fs, region_id, transaction }) {

    let freetext = PrepareSearch.simplePrepare(name_fs)
    freetext = freetext != undefined ? freetext : '""';
    let withQuery = [];
    withQuery.push(`cities_prep as
                        (SELECT Cities.* ,
                        0 aS RANK
                        FROM Regions
                        WHERE region_id = ISNULL(NULLIF(:region_id,''),region_id)
                        )`);


    withQuery.push(
      `search_fts as (
            SELECT t.* FROM (SELECT 
              [KEY],
              ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK],
			  COUNT(*) OVER() as counter
              FROM 
              CONTAINSTABLE (Cities,  
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
                  SELECT c.id,c.name,c.longitude,c.latitude FROM cities_prep c
                  ${PrepareSearch.clean(name_fs).length>2 ? 'JOIN  search_fts fs ON c.id= fs.[KEY]  ORDER BY fs.RANK DESC ,name' : 'ORDER BY name'}`

    return this.sequelizeDI.sequelize.query(
      query
      ,
      {
        replacements: {
          freetext: freetext,
          region_id:region_id
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }
}
