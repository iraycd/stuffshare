'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CategoryOptionsTemplate', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      co_id: {
        type: Sequelize.UUID
      },
      cott_id:{
        type: Sequelize.UUID
      },
      value: {
        type: Sequelize.STRING,
      }, 
       value_pl: {
        type: Sequelize.STRING,
      }, 
      value_us:{
        type: Sequelize.STRING,

      },
      value_de:{
        type: Sequelize.STRING,

      },
      value_ru:{
        type: Sequelize.STRING,

      },
      value_fr:{
        type: Sequelize.STRING,

      },value_es:{
        type: Sequelize.STRING,

      },
      value_no:{
        type: Sequelize.STRING,

      },
      value_zh_cn:{
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CategoryOptionsTemplate');
  }
};