'use strict';


let fs = require('fs');


let Promise = require('bluebird');
let readline = require('readline')
let uuidv4 = require( "uuid/v4");


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
    let countries = [];
    await new Promise(function(resolve, reject) {
      rl.on('line', function (line) {
        line_no++;
        let lineobj = line.split('	');
  
        if (lineobj[7] == 'PCLI' ) {
  
          countries.push({
            uid:lineobj[0],
            name:lineobj[1],
            clear_name: lineobj[2],
            name_clob:lineobj[3],
            latitude: lineobj[4],
            longitude: lineobj[5],
            countryCode: lineobj[8]

          })
         
        }
  
  
      });
      rl.on('close', function (line) {
        console.log('FINISH')
        resolve();
      });
    });
    

    await Promise.mapSeries(countries, async country => {

      return queryInterface.bulkInsert('Countries', [{
        id:uuidv4(),
        name: country.name,
        uid:country.uid,
        name_clob:country.name_clob,
        name_clear:country.clear_name,
        latitude: country.latitude,
        longitude: country.longitude,
        countryCode:country.countryCode,
        status:'V'
      }]);
    });


  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Countries', null, {});
  }
};
