"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "language", Sequelize.STRING);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "language");
  }
};
