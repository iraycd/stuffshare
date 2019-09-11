"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `  
            ALTER TABLE CategoryOptions
              ADD [is_form_hidden] bit NULL
            
         
            ALTER TABLE CategoryOptionsLinks
              ADD [is_form_hidden] bit NULL

        `

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptions
      DROP COLUMN  [is_form_hidden] 
    
 
    ALTER TABLE CategoryOptionsLinks
    DROP COLUMN  [is_form_hidden]
      
`)
  }
};
