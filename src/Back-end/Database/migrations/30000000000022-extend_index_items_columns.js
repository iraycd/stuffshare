"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `  
            ALTER FULLTEXT INDEX ON [dbo].[Items] ADD ([clobSearch_de] LANGUAGE [German])
  
            ALTER FULLTEXT INDEX ON [dbo].[Items] ADD ([clobSearch_es] LANGUAGE [Spanish])
  
            ALTER FULLTEXT INDEX ON [dbo].[Items] ADD ([clobSearch_fr] LANGUAGE [French])
  
            ALTER FULLTEXT INDEX ON [dbo].[Items] ADD ([clobSearch_no] LANGUAGE [Swedish])
  
           -- ALTER FULLTEXT INDEX ON [dbo].[Items] ADD ([clobSearch_pl] LANGUAGE [Polish])
  
            ALTER FULLTEXT INDEX ON [dbo].[Items] ADD ([clobSearch_ru] LANGUAGE [Russian])
  
            ALTER FULLTEXT INDEX ON [dbo].[Items] ADD ([clobSearch_zh_cn] LANGUAGE [Chinese (Hong Kong SAR, PRC)])
  `

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            ALTER FULLTEXT INDEX ON [dbo].[Items] DROP ([clobSearch_de]) 
                  ALTER FULLTEXT INDEX ON [dbo].[Items] DROP ([clobSearch_es]) 
                  ALTER FULLTEXT INDEX ON [dbo].[Items] DROP ([clobSearch_fr]) 
                  ALTER FULLTEXT INDEX ON [dbo].[Items] DROP ([clobSearch_no]) 
                --  ALTER FULLTEXT INDEX ON [dbo].[Items] DROP ([clobSearch_pl]) 
                  ALTER FULLTEXT INDEX ON [dbo].[Items] DROP ([clobSearch_ru]) 
                  ALTER FULLTEXT INDEX ON [dbo].[Items] DROP ([clobSearch_zh_cn]) 
            

    `)
  }
};
