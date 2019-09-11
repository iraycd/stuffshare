"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
 
        return queryInterface.sequelize
          .query(
            `  
        
            ALTER TABLE ItemCategoryOptions
              ADD [col_id] char(36) NULL
                
            ALTER TABLE ItemCategoryOptions
            DROP COLUMN [category_id]
                  
            ALTER TABLE ItemCategoryOptions
            DROP COLUMN [co_id] 
      
        `

          )
 
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE ItemCategoryOptions
      DROP COLUMN [col_id] 

      ALTER TABLE ItemCategoryOptions
      ADD [category_id] char(36) NULL

      ALTER TABLE ItemCategoryOptions
      ADD [co_id] char(36) NULL
    `)
  }
};
