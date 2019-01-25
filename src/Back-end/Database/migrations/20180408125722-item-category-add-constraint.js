'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ItemCategories', ['item_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_item_category_item_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Items',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'no action',
    }).then(item => {
      return queryInterface.addConstraint('ItemCategories', ['category_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_item_categor_cat_id', // useful if using queryInterface.removeConstraint
        references: {
          table: 'Categories',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'no action',
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ItemCategories', 'FK_item_category_item_id').then(item => {
      return queryInterface.removeConstraint('ItemCategories', 'FK_item_categor_cat_id');
    })
  }
};