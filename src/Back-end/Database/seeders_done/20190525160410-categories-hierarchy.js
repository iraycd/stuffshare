'use strict';


let fs = require('fs');


let Promise = require('bluebird');
let readline = require('readline')
let cat = require('C:/Programowanie/Private/stuffshare/src/Back-end/Database/Categories.json')
//const translate = require('@vitalets/google-translate-api');
const uuidv4 = require("uuid/v4");
const translate = require('translate');

// create instance of readline
// each instance is associated with single input stream


let line_no = 0;

// event is emitted after each line

module.exports = {
  up: async (queryInterface, Sequelize) => {


    //  let cat = fs.readFileSync('C:item.item/Programowanie/Private/stuffshare/src/Back-end/Database/Categories.json')
    // console.dir(result);
    //});
    return await Promise.mapSeries(cat, async item => {

      if(!item.name && item.name.length<2)
      {
        return;
      }
      
     

      console.log(item);
      if (item.name && item.name.length < 125) {
        let newItem = {
          id: uuidv4()
          , category_child_id: item.id
          , category_parent_id: item.parentId
          ,created_at:new Date().toISOString()
          ,updated_at:new Date().toISOString()
        };
        return queryInterface.bulkInsert('CategoryHierarchies', [newItem]);
      }
      return item;
    });

    /*
        await Promise.mapSeries(countries, async country => {
    
          return queryInterface.bulkInsert('Continents', {            name:item.item country.name,
            uid:item.itemcountry.uid,
            name_clob:item.itemcountry.name_clob,
            name_clear:item.itemcountry.clear_name,
            status:item.item'V'
          }]);
        });
    */

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CategoryHierarchies', null, {});
  }
};
