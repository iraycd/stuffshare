const Sequelize =require('sequelize');
/*const sequelize = new Sequelize('m1196_junkshare', 'm1196_junkshare', 'mc6r7vpstwNXoFQs3AU7', {
  host: 'mysql16.mydevil.net',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});*/


const sequelize = new Sequelize('DB_A43E8B_stuffshare', 'DB_A43E8B_stuffshare_admin', 'stuffShare123', {
  dialect: 'mssql',
  
   
    host: 'SQL6003.site4now.net',
    username: 'DB_A43E8B_stuffshare_admin',
    password: 'stuffShare123',
    database: 'DB_A43E8B_stuffshare'
  
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });