"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(
      `
      ALTER VIEW V_Categories_FT 
      WITH SCHEMABINDING
      AS (
      SELECT [id]
            ,[category]
            ,ISNULL([category_pl],category) as [category_pl]
            ,ISNULL(category_us,category) as category_us
            ,ISNULL(category_de,category) as category_de
            ,ISNULL(category_ru,category) as category_ru
            ,ISNULL(category_fr,category) as category_fr
            ,ISNULL(category_es,category) as category_es
            ,ISNULL(category_no,category) as category_no
            ,ISNULL(category_zh_cn,category) as category_zh_cn

            ,[status]
        FROM [dbo].[Categories]
        WHERE status = 1
        )

    `

    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(` ALTER VIEW V_Categories_FT 
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
`);
  }
};
