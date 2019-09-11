"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
 
        return queryInterface.sequelize
          .query(
            `  
        
            ALTER TABLE CategoryOptions
              ADD [is_on_map] bit NULL
            
            ALTER TABLE CategoryOptions
              ADD [is_on_pin_map] bit NULL

            ALTER TABLE CategoryOptionsLinks
              ADD [is_on_map] bit NULL
             
            ALTER TABLE CategoryOptionsLinks
              ADD [is_on_pin_map] bit NULL

            ALTER TABLE CategoryOptionsTemplates
              ADD [is_not_in_clob] bit NULL
      
        `

          )
 
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE CategoryOptions
      DROP COLUMN [is_on_map] 
        
      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN  [is_on_map] 
          

      ALTER TABLE CategoryOptions
        DROP COLUMN [is_on_pin_map] 
        
      ALTER TABLE CategoryOptionsLinks
      DROP COLUMN  [is_on_pin_map] 


      ALTER TABLE CategoryOptionsTemplates
      DROP COLUMN  [is_not_in_clob]
    `)
  }
};
