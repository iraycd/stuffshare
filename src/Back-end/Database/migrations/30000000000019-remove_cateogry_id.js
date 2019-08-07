"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('CategoryOptions', 'FK_cat_id_cot_id')
      .then(succ => {
        return queryInterface.sequelize
          .query(
            `  
            ALTER TABLE CategoryOptions
              DROP COLUMN category_id

        `

          )
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
      ALTER TABLE CategoryOptions
      ADD  category_id char(36) NULL

    `).then(
        succ => {
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
        }
      );
  }
};
