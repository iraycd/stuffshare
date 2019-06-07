'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CategoryOptionsTypeTemplates', ['cot_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_cot_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'CategoryOptionsTypes',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }).then(item => {
      return queryInterface.addConstraint('CategoryOptions', ['cot_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_cot_co', // useful if using queryInterface.removeConstraint
        references: {
          table: 'CategoryOptionsTypes',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      })
    }).then(succ => {

      return queryInterface.addConstraint('CategoryOptions', ['category_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_cat_id_cot_id', // useful if using queryInterface.removeConstraint
        references: {
          table: 'Categories',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      })
    }).then(succ => {

      return queryInterface.addConstraint('CategoryOptionsTemplates', ['co_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_co_id_cot_id', // useful if using queryInterface.removeConstraint
        references: {
          table: 'CategoryOptions',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      })
    }).then(succ => {

      return queryInterface.addConstraint('CategoryOptionsTemplates', ['cott_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_cott_id_cotemplate_id', // useful if using queryInterface.removeConstraint
        references: {
          table: 'CategoryOptionsTypeTemplates',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      })
    })


  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('CategoryOptions', 'FK_cat_id_cot_id')
    .then(item => {
      return queryInterface.removeConstraint('CategoryOptions', 'FK_cot_co')
    }).then(item => {
      return queryInterface.removeConstraint('CategoryOptionsTemplates', 'FK_co_id_cot_id')
    }).then(item => {
      return queryInterface.removeConstraint('CategoryOptionsTemplates', 'FK_cott_id_cotemplate_id')
    }).then(item => {
      return queryInterface.removeConstraint('CategoryOptionsTypeTemplates', 'FK_cot_id')
    })
  }
};