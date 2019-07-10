'use strict';


let fs = require('fs');


let Promise = require('bluebird');
let readline = require('readline')
const uuidv4 = require("uuid/v4");


// create instance of readline
// each instance is associated with single input stream



// event is emitted after each line

let save = async (queryInterface, category, template) => {
  let result = await queryInterface.sequelize.query(`SELECT * FROM CategoryOptionsTypes WHERE name='${category.name}'`);
  if (result[0].length == 0) {
    await queryInterface.bulkInsert('CategoryOptionsTypes', [category]);
  }
  result = await queryInterface.sequelize.query(`SELECT * FROM CategoryOptionsTypes WHERE name='${category.name}'`);

  let mapPromises = template.map(async item => {

    let check = await queryInterface.sequelize.query(`SELECT * FROM CategoryOptionsTypeTemplates WHERE cot_id='${result[0][0].id}' AND [order]=${item.order}`);
    if (check[0].length == 0) {
      item.cot_id = result[0][0].id
      return await queryInterface.bulkInsert('CategoryOptionsTypeTemplates', [item]);

    } else {
      return new Promise((res, rej) => {
        res();
      });
    }
  })
  return await Promise.all(mapPromises)
}
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let date = new Date().toISOString()
    let id = uuidv4();
    let category = {
      id: id,
      name: "NUMBER",
      type: "SINGLE",
      status: true,
      created_at: date,
      updated_at: date

    };

    let template = [{
      id: uuidv4(),
      cot_id: id,
      type: "long",
      status: true,
      order: 1,
      created_at: date,
      updated_at: date

    }];
    await save(queryInterface, category, template);

    //await queryInterface.bulkInsert('CategoryOptionsType', [category]);
    //await queryInterface.bulkInsert('CategoryOptionsTypeTemplate', [template]);

    id = uuidv4();
    category = {
      id: id,
      name: "FLOAT",
      type: "SINGLE",
      status: 1,
      created_at: date,
      updated_at: date,


    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = uuidv4();
    category = {
      id: id,
      name: "DATE",
      type: "SINGLE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "datetime",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);


    id = uuidv4();
    category = {
      id: id,
      name: "STRING",
      type: "SINGLE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = uuidv4();
    category = {
      id: id,
      name: "BOOLEAN",
      type: "SINGLE",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "bit",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);


    id = uuidv4();
    category = {
      id: id,
      name: "BETWEEN NUMBERS",
      type: "BETWEEN",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "long",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: uuidv4(),
      cot_id: id,
      type: "long",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }]

    await save(queryInterface, category, template);

    id = uuidv4();
    category = {
      id: id,
      name: "BETWEEN FLOAT",
      type: "BETWEEN",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: uuidv4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = uuidv4();
    category = {
      id: id,
      name: "SELECT NUMBERS",
      type: "SELECT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "long",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]

    await save(queryInterface, category, template);

    id = uuidv4();
    category = {
      id: id,
      name: "SELECT VARCHARS",
      type: "SELECT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);



    id = uuidv4();
    category = {
      id: id,
      name: "MULTISELECT VARCHARS",
      type: "MULTI_SELECT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "nvarchar",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);

    id = uuidv4();
    category = {
      id: id,
      name: "MULTISELECT NUMBER",
      type: "MULTI_SELECT",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "float",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);





    id = uuidv4();
    category = {
      id: id,
      name: "BETWEEN DATE",
      type: "BETWEEN",
      status: 1,
      created_at: date,
      updated_at: date,
    }
    template = [{
      id: uuidv4(),
      cot_id: id,
      type: "datetime",
      status: 1,
      order: "1",
      created_at: date,
      updated_at: date

    }, {
      id: uuidv4(),
      cot_id: id,
      type: "datetime",
      status: 1,
      order: "2",
      created_at: date,
      updated_at: date

    }]
    await save(queryInterface, category, template);





  },

  down: (queryInterface, Sequelize) => {
    //return //queryInterface.bulkDelete('Continents', null, {});
  }
};
