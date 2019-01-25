"use strict";
module.exports = {
  up: (migration, Sequelize) => {
    return migration.sequelize
      .query(
        `
    CREATE FULLTEXT CATALOG search_catalog AS DEFAULT
    `
      )
      .then(res => {
        return migration.sequelize.query(`
              DECLARE @constraint nvarchar(100);
              SET @constraint = (SELECT CONSTRAINT_NAME
                          FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                          WHERE OBJECTPROPERTY(OBJECT_ID(CONSTRAINT_SCHEMA + '.' + QUOTENAME(CONSTRAINT_NAME)), 'IsPrimaryKey') = 1
                          AND TABLE_NAME = 'Items' AND TABLE_SCHEMA = 'dbo')
              
              DECLARE @create_index nvarchar(400)=	'CREATE FULLTEXT INDEX  ON [dbo].Items
                                    (
                                      clobSearch_us LANGUAGE 1033,
                              
                                      clobSearch_pl LANGUAGE 1045
                                    ) KEY INDEX '+@constraint
              EXECUTE sp_executesql @create_index
          `);
      })
      .then(res => {
        return migration.sequelize.query(`      
              CREATE FUNCTION dbo.[Split](@String varchar(MAX), @Delimiter char(1))       
              returns @temptable TABLE (id int Primary Key IDENTITY(1,1),items varchar(MAX))       
              as       
              begin      
                  declare @idx int       
                  declare @slice varchar(8000)       
                  select @idx = 1       
                      if len(@String)<1 or @String is null  return       

                  while @idx!= 0       
                  begin       
                      set @idx = charindex(@Delimiter,@String)       
                      if @idx!=0       
                          set @slice = left(@String,@idx - 1)       
                      else       
                          set @slice = @String       

                      if(len(@slice)>0)  
                          insert into @temptable(Items) values(@slice)       

                      set @String = right(@String,len(@String) - @idx)       
                      if len(@String) = 0 break       
                  end   
              return 
              end;
          `);
      })
      .then(res => {
        return migration.sequelize.query(`                  
          CREATE FUNCTION dbo.Trim(@string NVARCHAR(MAX))
          RETURNS NVARCHAR(MAX)
          BEGIN
          RETURN LTRIM(RTRIM(@string))
          END
          `);
      })
      .then(res => {
        return migration.sequelize.query(`                  
        CREATE FUNCTION dbo.[prepareSearch]
        (
          @p_text nvarchar(4000),
          @p_use_wildcards bit = 1
        )
        RETURNS nvarchar(MAX)
        AS
        BEGIN
          -- Declare the return variable here
          SET @p_text = REPLACE(dbo.Trim(@p_text),'''','');
          DECLARE @v_iter int=1;
          DECLARE @v_size int;
          DECLARE @v_isForm nvarchar(max)='';
          DECLARE @v_original nvarchar(max)='';
          DECLARE @v_wildcard nvarchar(max)='';
          DECLARE @v_word nvarchar(200);
          DECLARE @v_wieght varchar(3) = '.4';
          DECLARE @v_rest varchar(max) = '';
          DECLARE @v_extend int = 0;
          DECLARE @v_original_wild nvarchar(max)='';
          SET @v_size = (SELECT COUNT(*) FROM dbo.Split(@p_text,' '));
          if @v_size =0 
          BEGIN
            return '';
          END
          WHILE( @v_iter<= @v_size)
          BEGIN
            SET @v_word = (SELECT dbo.Trim(i.items) FROM dbo.Split(@p_text,' ') i where i.id=@v_iter);
            SET @v_original = @v_original+' '+@v_word; 
            if((LEN(@v_word)>2 OR (LEN(@v_word)>0 AND @v_iter>1)) AND @v_size>1) 
            begin
              SET @v_extend = 1;
              if(LEN(@v_wildcard)>0) 
              BEGIN
                SEt @v_wildcard = @v_wildcard+' NEAR ' ;
              end
              SEt @v_wildcard = @v_wildcard+' "'+@v_word+'*" ';
            end
            if(LEN(@v_word)>2 AND @v_size>1) 
            begin
              SET @v_rest = @v_rest +',FORMSOF(INFLECTIONAL,"'+@v_word+'") weight(0.1)';
            end
            SET @v_iter=@v_iter+1;
          END
          if LEN(@v_wildcard)>0 
          BEGIN
            SET @v_wildcard = ''+dbo.Trim(@v_wildcard)+' weight (.5)';
        
          END;
          SET @v_isForm = ' FORMSOF(INFLECTIONAL,"'+dbo.Trim(@v_original)+'") weight (0.6)' + (case when @v_extend>0 AND @p_use_wildcards=1 then',' else '' end)
          if(@p_use_wildcards=1)
          BEGIN
            SET @v_original_wild = ' "' +dbo.Trim(@v_original)+'*" weight(0.6), '
          END
          if(@p_use_wildcards=0)
          BEGIN
            SET @v_original_wild = '';
            SET @v_wildcard='';
            SET @v_rest='';
        
          END
          SET @v_original = ' "'+dbo.Trim(@v_original)+'" weight(.9), '
          RETURN  'ISABOUT('+@v_original +@v_original_wild+ @v_isForm + @v_wildcard+@v_rest+')'
        
        END
          `);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`DROP FUNCTION IF EXISTS dbo.prepareSearch`)
      .then(succ => {
        return queryInterface.sequelize.query(
          `DROP FUNCTION IF EXISTS dbo.Trim`
        );
      }).then(succ => {
        return queryInterface.sequelize.query(
          `DROP FUNCTION IF EXISTS dbo.Split`
        );
      }).then(succ => {
        return queryInterface.sequelize.query(
          `DROP FULLTEXT INDEX ON [dbo].Items`
        );
      }).then(succ => {

        return queryInterface.sequelize.query(
          `DROP FULLTEXT CATALOG search_catalog`
        );
      }).catch(ex=>{
        console.log(ex);
        return null
      });
  }
};
