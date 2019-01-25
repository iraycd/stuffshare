'use strict';

let fs = require('fs');

let xsltProcess = require("xslt-processor");
var parseString = require('xml2js').parseString;

var parser = require('xml2json-light');
let json2xml = require("json2xml");
let Promise = require('bluebird');
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let tmp = await fs.readFileSync(`Regions.xml`);
    // parseString(tmp, function (err, result) {
    // console.dir(result);
    //});
    var json = parser.xml2json(tmp.toString());
    await Promise.mapSeries(json.Countries.Country, async country => {

      const countryId = await queryInterface.rawSelect('Countries', {
        where: {
          name: country.Name.split(` `).map(item => {
            item = item.replace('>', '');
            
            item = item.replace('&apos;', `'`);
            if(item==`D'IVOIRE`){
              return `d'Ivoire`
            }
            if (item.includes('(')) {
              return item;
            }
            return item.length > 2 ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase();
          }).join(' '),
        },
      }, ['id']);

      return await Promise.mapSeries(country.Regions.Region.length > 1 ? country.Regions.Region : [country.Regions.Region], async region => {

        return await queryInterface.bulkInsert('Regions', [{
          name: region.Name,
          country_id: countryId,
          status: 1
        }], {});
      });

    });


  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Regions', null, {});
  }
};
