"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(
      `
      CREATE UNIQUE CLUSTERED INDEX ftidx_Categories_FT
            ON [dbo].V_Categories_FT (id);
        
            CREATE FULLTEXT INDEX ON [dbo].V_Categories_FT(
            [category_pl] LANGUAGE polish ,
            category_us LANGUAGE english,
             category_de LANGUAGE 1031,
             category_ru LANGUAGE 1049,
             category_fr LANGUAGE 1036,
             category_es LANGUAGE 3082,
             category_no LANGUAGE 1044,
             category_zh_cn LANGUAGE 2052)
            KEY INDEX ftidx_Categories_FT ON (search_catalog, FILEGROUP [PRIMARY])
            WITH (CHANGE_TRACKING = AUTO, STOPLIST = SYSTEM)
        
      

    `

    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(`
            
    DROP FULLTEXT INDEX ON V_Categories_FT
    DROP INDEX [ftidx_Categories_FT] ON [dbo].[V_Categories_FT] WITH ( ONLINE = OFF )

        
      
        
    `);
  }
};
