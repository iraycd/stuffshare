"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(
      `
      CREATE VIEW V_Categories_FT 
      WITH SCHEMABINDING
      AS (
      SELECT [id]
            ,[category]
            ,ISNULL([category_pl],category) as [category_pl]
            ,ISNULL(category_us,category) as category_us
            ,[status]
        FROM [dbo].[Categories]
        WHERE status = 1
        )

    `

    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query('DROP  VIEW V_Categories_FT');
  }
};
