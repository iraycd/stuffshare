"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DECLARE @constraint nvarchar(100);
      SET @constraint = (SELECT CONSTRAINT_NAME
                  FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                  WHERE OBJECTPROPERTY(OBJECT_ID(CONSTRAINT_SCHEMA + '.' + QUOTENAME(CONSTRAINT_NAME)), 'IsPrimaryKey') = 1
                  AND TABLE_NAME = 'Cities' AND TABLE_SCHEMA = 'dbo')
      
      DECLARE @create_index nvarchar(400)=	'CREATE FULLTEXT INDEX  ON [dbo].Cities
                            (
                              name_clob
                            ) KEY INDEX '+@constraint
      EXECUTE sp_executesql @create_index
    
    
    
    SET @constraint = (SELECT CONSTRAINT_NAME
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE OBJECTPROPERTY(OBJECT_ID(CONSTRAINT_SCHEMA + '.' + QUOTENAME(CONSTRAINT_NAME)), 'IsPrimaryKey') = 1
                AND TABLE_NAME = 'Countries' AND TABLE_SCHEMA = 'dbo')
    
    SET @create_index =	'CREATE FULLTEXT INDEX  ON [dbo].Countries
                          (
                            name_clob
                          ) KEY INDEX '+@constraint
    EXECUTE sp_executesql @create_index

    


      ALTER FULLTEXT INDEX ON dbo.Cities  
      START FULL POPULATION;  



      ALTER FULLTEXT INDEX ON dbo.Countries  
      START FULL POPULATION;  
    `)

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP FULLTEXT INDEX ON [dbo].Cities`).
    then(succ => {
        return queryInterface.sequelize.query(`DROP FULLTEXT INDEX ON [dbo].Countries`);
      });

  }
};
