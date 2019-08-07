"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE Users
        ADD zipcode nvarchar(20) NULL;

        ALTER TABLE Users
         ADD address nvarchar(300) NULL;
        
         ALTER TABLE Users
         ADD city_id char(36) NULL

         ALTER TABLE Users
         ADD city nvarchar(300) NULL

         ALTER TABLE Users
         ADD country_id char(36) NULL

        `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
 
      ALTER TABLE Users
      DROP COLUMN  zipcode ;

      ALTER TABLE Users
      DROP COLUMN  address
      
       ALTER TABLE Users
       DROP COLUMN  city_id 
       ALTER TABLE Users
       DROP COLUMN  city 

       ALTER TABLE Users
       DROP COLUMN  country_id 
      
        
      
        
    `);
  }
};
