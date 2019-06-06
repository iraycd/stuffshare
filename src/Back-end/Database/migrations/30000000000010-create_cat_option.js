'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CategoryOptions', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      cot_id: {
        type: Sequelize.UUID,
      },
      category_id: {
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      name_pl:{
        type: Sequelize.STRING,

      } ,
      name_us:{
        type: Sequelize.STRING,

      },
      name_de:{
        type: Sequelize.STRING,

      },
      name_ru:{
        type: Sequelize.STRING,

      },
      name_fr:{
        type: Sequelize.STRING,

      },name_es:{
        type: Sequelize.STRING,

      },
      name_no:{
        type: Sequelize.STRING,

      },
      name_zh_cn:{
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
    return queryInterface.dropTable('CategoryOptions');
  }
};