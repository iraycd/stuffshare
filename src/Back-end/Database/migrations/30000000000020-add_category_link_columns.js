"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
 
        return queryInterface.sequelize
          .query(
            `  
        
            ALTER TABLE CategoryOptionsLinks
              ADD [order] [int] NULL
            
            ALTER TABLE CategoryOptionsLinks
              ADD is_searchable [bit] NULL

            ALTER TABLE CategoryOptionsLinks
              ADD is_require [bit] NULL

            ALTER TABLE CategoryOptionsLinks
              ADD limit_of [int] NULL
        `

          )
 
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN [order]
    
    ALTER TABLE CategoryOptionsLinks
    DROP COLUMN is_searchable 

    ALTER TABLE CategoryOptionsLinks
    DROP COLUMN is_require 

    ALTER TABLE CategoryOptionsLinks
    DROP COLUMN limit_of 

    `)
  }
};
