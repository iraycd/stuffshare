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
    let cities = [];

    await new Promise(function (resolve, reject) {
      rl.on('line', function (line) {
        line_no++;
        let lineobj = line.split('	');

        if (lineobj[7] == 'ADM3') {

          cities.push({
            uid: lineobj[0],
            name: lineobj[1],
            clear_name: lineobj[2],
            name_clob: lineobj[3],
            latitude: lineobj[4],
            longitude: lineobj[5],
            population: lineobj[14]


          })


        }

      });
      rl.on('close', function (line) {
        console.log('FINISH')
        resolve();
      });
    });


    await Promise.mapSeries(cities, async city => {

      return queryInterface.bulkInsert('Cities', [{
        name: city.name,
        uid: city.uid,
        name_clob: city.name_clob,
        name_clear: city.clear_name,
        status: 'V',
        population: city.population,
        latitude: city.latitude,
        longitude: city.longitude

      }]);
    });


  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', null, {});
  }
};
