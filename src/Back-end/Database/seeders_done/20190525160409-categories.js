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
      let translate_us = await translate(item.name, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: 'pl', to: 'en' });
      let translate_de = await translate(item.name, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: 'pl', to: 'de' });
      let translate_fr = await translate(item.name, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: 'pl', to: 'fr' });
      let translate_ru = await translate(item.name, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: 'pl', to: 'ru' });
      let translate_es = await translate(item.name, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: 'pl', to: 'es' });
      let translate_no = await translate(item.name, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: 'pl', to: 'no' });
      let translate_zh_cn = await translate(item.name, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: 'pl', to: 'zh' });

     
      item.item_us = (translate_us && translate_us) ? translate_us : item.name;
      item.item_de = (translate_de && translate_de) ? translate_de : item.name
      item.item_fr = (translate_fr && translate_fr) ? translate_fr : item.name
      item.item_ru = (translate_ru && translate_ru) ? translate_ru : item.name
      item.item_es = (translate_es && translate_es) ? translate_es : item.name
      item.item_no = (translate_no && translate_no) ? translate_no : item.name
      item.item_zh_cn = (translate_zh_cn && translate_zh_cn) ? translate_zh_cn : item.name

      console.log(item);
      if (item.name && item.name.length < 125) {
        let newItem = {
          id: item.id
          , category: item.name
          , category_pl: item.name
          , category_us: item.item_us
          , status: 1
          , icon: ''
          , forThing: 0
          , forSell: 1
          , forEvent: 0
          , category_de: item.item_de
          , category_ru: item.item_ru
          , category_fr: item.item_fr
          , category_es: item.item_es
          , category_no: item.item_no
          , category_zh_cn: item.item_zh_cn
        };
        return queryInterface.bulkInsert('Categories', [newItem]);
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
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
