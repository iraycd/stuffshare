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


    return  queryInterface.sequelize.query(
     `
     UPDATE   c
      SET c.countrY_id = ct.id
      FROM Cities c
      JOIN Countries ct
      ON ct.countryCode=c.countryCode;

      UPDATE 
        Cities
        SET name_clob=ISNULL(NULLIF(name_clob,''),name)
        WHERE NULLIF(name_clob,'') is null
    `);
    


  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Continents', null, {});
  }
};
