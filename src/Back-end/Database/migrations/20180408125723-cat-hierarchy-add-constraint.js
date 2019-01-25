'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CategoryHierarchies', ['category_child_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_cat_hierarchy', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Categories',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }).then(item => {
      return queryInterface.addConstraint('CategoryHierarchies', ['category_parent_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_cat_hierarchy_parent', // useful if using queryInterface.removeConstraint
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
    return queryInterface.removeConstraint('CategoryHierarchies', 'FK_cat_hierarchy').then(item => {
      return queryInterface.removeConstraint('CategoryHierarchies', 'FK_cat_hierarchy_parent');
    })
  }
};