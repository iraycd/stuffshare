"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE CategoryOptions
        ADD is_searchable bit NULL;

        ALTER TABLE CategoryOptions
         ADD is_require bit NULL;
        
         ALTER TABLE CategoryOptions
         ADD limit_of int NULL

        `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
 
     
      ALTER TABLE CategoryOptions DROP COLUMN is_searchable ;
      ALTER TABLE CategoryOptions DROP COLUMN  is_require;
      ALTER TABLE CategoryOptions  DROP COLUMN limit_of
      
        
      
        
    `);
  }
};
