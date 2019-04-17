import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import CountryDTO from "../../Shared/DTO/Country/CountryDTO.js";
import PrepareSearch from "../Architecture/prepareSearch.js";


/**
 *
 * @export
 * @class CountryRepository
 * @extends BaseRepository
 */
export default class CountryRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof CountryRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Country);
    this.sequelizeDI = sequelizeDI;
  }


  /**
   *
   *
   * @param {*} { user_id,country_id, transaction }
    * @return {Promise<CountryDTO[]>}
    *  @memberof UserRepository
   */
  getCountryByName({ name_fs,  transaction }) {

    let freetext = PrepareSearch.simplePrepare(name_fs)
    console.log(freetext);
    let withQuery = [];
    withQuery.push(`countries_prep as
                        (SELECT Countries.* ,
                        0 aS RANK
                        FROM Countries
                        )`);

   
      withQuery.push(
        `search_fts as (
            SELECT t.* FROM (SELECT 
              [KEY],
              ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK],
			  COUNT(*) OVER() as counter
              FROM 
              CONTAINSTABLE (Countries,  
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
                  SELECT c.id,c.name,c.longitude,c.latitude FROM countries_prep c
                  JOIN  search_fts fs ON c.id= fs.[KEY]
                  ORDER BY fs.RANK DESC ,name`;
    return this.sequelizeDI.sequelize.query(
      query
      ,
      {
        replacements: {
          freetext:freetext
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }
}
