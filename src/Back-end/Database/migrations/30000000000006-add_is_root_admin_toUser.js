"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
      ALTER TABLE Users    ADD is_admin bit NULL
      ALTER TABLE Users    ADD is_root bit NULL

    `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
      ALTER TABLE Users   DROP COLUMN is_admin 
      ALTER TABLE Users    DROP COLUMN  is_root

        
      
        
    `);
  }
};
