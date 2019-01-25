'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Blobs', ['user_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_blob_user', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'no action',
    }).then(item => {
      return queryInterface.addConstraint('Blobs', ['item_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_blob_item', // useful if using queryInterface.removeConstraint
        references: {
          table: 'Items',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }).then(item => {
        return queryInterface.addConstraint('Blobs', ['blob_id'], {
          type: 'FOREIGN KEY',
          name: 'FK_blob_migrate', // useful if using queryInterface.removeConstraint
          references: {
            table: 'BlobMappers',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        });
      })
      .then(item => {
        return queryInterface.addConstraint('Blobs', ['blob_thumbmail_id'], {
          type: 'FOREIGN KEY',
          name: 'FK_blob_thumbmail_migrate', // useful if using queryInterface.removeConstraint
          references: {
            table: 'BlobMappers',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        });
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Blobs', 'FK_blob_user').then(item => {
      return queryInterface.removeConstraint('Blobs', 'FK_blob_item');
    }).then(item=>{
      return queryInterface.removeConstraint('Blobs', 'FK_blob_migrate');
    }).then(item=>{
      return queryInterface.removeConstraint('Blobs', 'FK_blob_thumbmail_migrate');
    })
  }
};