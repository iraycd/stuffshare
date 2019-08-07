"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE Countries
        ADD  updated_at datetimeoffset(7) NULL

        ALTER TABLE Countries
        ADD  created_at datetimeoffset(7) NULL
        ALTER TABLE Cities
        ADD  updated_at datetimeoffset(7) NULL

        ALTER TABLE Cities
        ADD  created_at datetimeoffset(7) NULL
       


        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
      ALTER TABLE Countries
      DROP COLUMN updated_at 

      ALTER TABLE Countries
      DROP COLUMN created_at 
        
      ALTER TABLE Cities
      DROP COLUMN updated_at 

      ALTER TABLE Cities
      DROP COLUMN created_at 
        
        
    `);
  }
};
