"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `  
            ALTER TABLE Items 
            ALTER COLUMN description nvarchar(max);
            
            ALTER TABLE Items
            ADD status int NULL
         
        `

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE Items 
      ALTER COLUMN description nvarchar(1024);

      ALTER TABLE Items
            DROP COLUMN status 
      
`)
  }
};
