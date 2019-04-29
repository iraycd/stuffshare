'use strict';


let fs = require('fs');


let Promise = require('bluebird');
let readline = require('readline')


// create instance of readline
// each instance is associated with single input stream


let line_no = 0;

// event is emitted after each line

module.exports = {
  up: async (queryInterface, Sequelize) => {


    let rl = readline.createInterface({
      input: fs.createReadStream('C:/Users/michal_mach/Desktop/hierarchy (1)/hierarchy.txt')
    });   // parseString(tmp, function (err, result) {
    // console.dir(result);
    //});
    let countries = [];
    await new Promise(function(resolve, reject) {
      rl.on('line', function (line) {
        line_no++;
        let lineobj = line.split('	');
  
        if (lineobj[2] == 'ADM' ) {
  
          countries.push({
            parent:lineobj[0],
            child:lineobj[1],
           
  
          })
         
        }
  
  
      });
      rl.on('close', function (line) {
        console.log('FINISH')
        resolve();
      });
    });
    

    await Promise.mapSeries(countries, async country => {

      return queryInterface.bulkInsert('RegionHierarchy', [{
        id_parent: country.parent,
        id_child:country.child
       
      }]);
    }).then(succ=>{
      queryInterface.sequelize.query(
     `
        UPDATE s 
        SET s.continent_id = c.id
        FROM Countries s 
        JOIN [RegionHierarchy] r 
        ON r.id_child=s.uid
        JOIN Continents c ON c.uid = r. id_parent
        
        GO

          UPDATE s 
        SET s.country_id = c.id
        FROM Regions s 
        JOIN [RegionHierarchy] r 
        ON r.id_child=s.uid
        JOIN Countries c ON c.uid = r. id_parent
        

        
        GO
      UPDATE s 
        SET s.region_id = c.id
        FROM Subregions s 
        JOIN [RegionHierarchy] r 
        ON r.id_child=s.uid
        JOIN Regions c ON c.uid = r. id_parent

        GO

      UPDATE s 
        SET s.subregion_id = c.id
        FROM Cities s 
        JOIN [RegionHierarchy] r 
        ON r.id_child=s.uid
        JOIN Subregions c ON c.uid = r. id_parent



          GO

      UPDATE s 
        SET s.region_id = rg.id
        FROM Cities s 
        JOIN Subregions c ON c.id = s.subregion_id
        JOIN Regions rg ON rg.id = c.region_id;

        WITH result as (
          SELECT id,name,subregion_id, ROW_NUMBER() OVER(PARTITION BY name,subregion_id ORDER BY population DESC) as rn ,population FROM Cities)
          DELETE s FROM Cities s
          JOIN result ON result.id = s.id
          WHERE rn >1 OR s.subregion_id IS NULL;
          
                
        UPDATE Cities 
        SET name_clob=ISNULL(NULLIF(name_clob,''),name)


        UPDATE Subregions
        SET name_clob=ISNULL(NULLIF(name_clob,''),name)

        UPDATE Regions 
        SET name_clob=ISNULL(NULLIF(name_clob,''),name)

        UPDATE Countries 
        SET name_clob=ISNULL(NULLIF(name_clob,''),name)

        UPDATE Continents
        SET name_clob=ISNULL(NULLIF(name_clob,''),name)
        `);
    });


  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Continents', null, {});
  }
};
