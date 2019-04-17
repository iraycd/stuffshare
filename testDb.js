//const Sequelize =require('sequelize');
/*const sequelize = new Sequelize('m1196_junkshare', 'm1196_junkshare', 'mc6r7vpstwNXoFQs3AU7', {
  host: 'mysql16.mydevil.net',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});*/

/*
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
  */


let fs = require('fs');

let xsltProcess = require("xslt-processor");
var parseString = require('xml2js').parseString;

var parser = require('xml2json-light');
let json2xml = require("json2xml");
let Promise = require('bluebird');
let readline = require('readline')


// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/michal_mach/Desktop/allCountries/allCountries.txt')
});

let line_no = 0;

// event is emitted after each line
rl.on('line', function (line) {
  line_no++;
  let lineobj = line.split('	');
  /*
  if (lineobj[7] == 'PCLI' &&  lineobj[8]=='PL') {
    console.log(line);

    console.log(lineobj[0]);
    console.log(lineobj[1]);
    console.log(lineobj[2]);
    console.log(lineobj[3]);

    console.log(lineobj[4]);
    console.log(lineobj[5]);
    console.log(lineobj[6]);
    console.log(lineobj[7]);
    console.log(lineobj[8]);

    console.log(lineobj[16]);
    console.log(lineobj[14]);
    console.log(lineobj[16]);
  }
  */
 /*
  if (lineobj[7] == 'ADM1' &&  lineobj[8]=='PL') {
    console.log(line);

    console.log(lineobj[0]);
    console.log(lineobj[1]);
    console.log(lineobj[2]);
    console.log(lineobj[3]);

    console.log(lineobj[4]);
    console.log(lineobj[5]);
    console.log(lineobj[6]);
    console.log(lineobj[7]);
    console.log(lineobj[8]);

    console.log(lineobj[16]);
    console.log(lineobj[14]);
    console.log(lineobj[16]);
  }*/
/*
  if (lineobj[7] == 'PPLA2' &&  lineobj[8]=='PL') {
    console.log(line);

    console.log(lineobj[0]);
    console.log(lineobj[1]);
    console.log(lineobj[2]);
    console.log(lineobj[3]);

    console.log(lineobj[4]);
    console.log(lineobj[5]);
    console.log(lineobj[6]);
    console.log(lineobj[7]);
    console.log(lineobj[8]);

    console.log(lineobj[16]);
    console.log(lineobj[14]);
    console.log(lineobj[16]);
  }*/
  if (lineobj[7] == 'CONT' ) {
    console.log(line);

    console.log(lineobj[0]);
    console.log(lineobj[1]);
    console.log(lineobj[2]);
    console.log(lineobj[3]);

    console.log(lineobj[4]);
    console.log(lineobj[5]);
    console.log(lineobj[6]);
    console.log(lineobj[7]);
    console.log(lineobj[8]);

    console.log(lineobj[16]);
    console.log(lineobj[14]);
    console.log(lineobj[16]);
  }
  
});

// end
rl.on('close', function (line) {
  console.log('Total lines : ' + line_no);
});

