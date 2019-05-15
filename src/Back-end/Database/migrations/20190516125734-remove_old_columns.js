"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.removeConstraint('Countries', 'FK_countries_continents_id').then(succ=>{
      return queryInterface.removeConstraint('Subregions', 'FK_subregion_region_id')

    }).then(succ=>{
      return queryInterface.removeConstraint('Cities', 'FK_cities_subregion_id')
    }
    ).then(succ=>{
      return queryInterface.removeConstraint('Cities', 'FK_cities_region_id')

    }).then(succ=>{
      return queryInterface.removeConstraint('Regions', 'FK_region_country_id');

    }).then(succ=>{
      return queryInterface.dropTable('Subregions');

    }).then(succ=>{
      return queryInterface.dropTable('Regions');

    })
    .then(succ=>{
      return queryInterface.dropTable('Continents');

    })


  },
  down: (queryInterface, Sequelize) => {
    return 
  }
};
