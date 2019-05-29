'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Categories    ADD icon nvarchar(150) NULL
        ALTER TABLE Categories    ADD forThing bit NULL
        ALTER TABLE Categories    ADD forSell bit NULL
        ALTER TABLE Categories    ADD forEvent bit NULL
        ALTER TABLE Categories    ADD category_de nvarchar(255) NULL
        ALTER TABLE Categories    ADD category_ru nvarchar(255) NULL
        ALTER TABLE Categories    ADD category_fr nvarchar(255) NULL
        ALTER TABLE Categories    ADD category_es nvarchar(255) NULL
        ALTER TABLE Categories    ADD category_no nvarchar(255) NULL
        ALTER TABLE Categories    ADD category_zh_cn nvarchar(255) NULL
        ALTER TABLE Categories    ALTEr COLUMN created_at datetimeoffset(7) NULL
        ALTER TABLE Categories    ALTER COLUMN updated_at datetimeoffset(7) NULL
        



        
      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
  
      ALTER TABLE Categories DROP COLUMN icon  
      ALTER TABLE Categories    DROP COLUMN forSell
      ALTER TABLE Categories    DROP COLUMN forEvent 
      ALTER TABLE Categories    DROP COLUMN forThing 
      ALTER TABLE Categories    DROP COLUMN category_de
      ALTER TABLE Categories    DROP COLUMN category_ru 
      ALTER TABLE Categories    DROP COLUMN category_fr 
      ALTER TABLE Categories    DROP COLUMN category_es 
      ALTER TABLE Categories    DROP COLUMN category_no 
      ALTER TABLE Categories    DROP COLUMN category_zh_cn 



  `
    )
  }
};