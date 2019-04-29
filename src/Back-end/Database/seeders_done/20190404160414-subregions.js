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
      input: fs.createReadStream('C:/Users/michal_mach/Desktop/allCountries/allCountries.txt')
    });   // parseString(tmp, function (err, result) {
    // console.dir(result);
    //});
    let regiouns = [];
    
    await new Promise(function(resolve, reject) {
      rl.on('line', function (line) {
        line_no++;
        let lineobj = line.split('	');
  
        if (lineobj[7] == 'ADM2' ) {
  
          regiouns.push({
            uid:lineobj[0],
            clear_name: lineobj[2],
            name:lineobj[1],
            name_clob:lineobj[3],
  
          })
         
        }
  
  
      });
      rl.on('close', function (line) {
        console.log('FINISH')
        resolve();
      });
    });
    

    await Promise.mapSeries(regiouns, async region => {

      return queryInterface.bulkInsert('Subregions', [{
        name: region.name,
        uid:region.uid,
        name_clob:region.name_clob,
        name_clear:region.clear_name,
        status:'V'
      }]);
    });


  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subregions', null, {});
  }
};
