"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(
      `
      CREATE TRIGGER TRG_AUD_DEL
      ON Users
      FOR DELETE
      AS
        Delete i from Items i
        JOIN DELETED  d ON i.user_id = d.id
  
           DELETE b FROM Blobs  b 
         JOIN DELETED  d ON b.user_id = d.id;
    `

    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query('DROP TRIGGER [dbo].[TRG_AUD_DEL]');
  }
};
