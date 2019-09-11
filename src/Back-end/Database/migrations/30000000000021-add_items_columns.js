"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
 
        return queryInterface.sequelize
          .query(
            `  
        
            ALTER TABLE Items
              ADD [clobSearch_de] nvarchar(max) NULL
          
              ALTER TABLE Items
              ADD [clobSearch_no] nvarchar(max) NULL

              ALTER TABLE Items
              ADD [clobSearch_es] nvarchar(max) NULL

              ALTER TABLE Items
              ADD [clobSearch_fr] nvarchar(max) NULL

              ALTER TABLE Items
              ADD [clobSearch_ru] nvarchar(max) NULL

              ALTER TABLE Items
              ADD [clobSearch_zh_cn] nvarchar(max) NULL

              ALTER TABLE Items
              ADD [longitude] float NULL

              ALTER TABLE Items
              ADD [latitude] float NULL

              ALTER TABLE Items
              ADD category_id char(36) NULL

              ALTER TABLE Items
              ADD blob_id char(36) NULL

              ALTER TABLE Items
              ADD category_type int NULL
      
        `

          )
 
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
      ALTER TABLE Items

      DROP COLUMN [clobSearch_de] 
          
      ALTER TABLE Items
      DROP COLUMN [clobSearch_no] 

      ALTER TABLE Items
      DROP COLUMN [clobSearch_es]

      ALTER TABLE Items
      DROP COLUMN [clobSearch_fr] 

      ALTER TABLE Items
      DROP COLUMN [clobSearch_ru] 

      ALTER TABLE Items
      DROP COLUMN [clobSearch_zh_cn] 

      ALTER TABLE Items
      DROP COLUMN [longitude]

      ALTER TABLE Items
      DROP COLUMN  [latitude] 
      
      ALTER TABLE Items
      DROP COLUMN  category_id 

      ALTER TABLE Items
      DROP COLUMN blob_id 

      ALTER TABLE Items
      DROP COLUMN category_type
    `)
  }
};
