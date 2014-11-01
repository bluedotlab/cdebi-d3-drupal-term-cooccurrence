var mysql   = require('mysql');
var Promise = require("bluebird");
var config  = require('../config/config.js');

var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.pswd,
  database : config.dbnm
});

connection.connect();

var retrieve = function (query) {
  return new Promise(function (resolve, reject) {
    connection.query(query, function (err, rows, fields) {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

var queries = [
  'SELECT * FROM taxonomy_index',
  'SELECT * FROM taxonomy_vocabulary',
  'SELECT * FROM taxonomy_term_data',
  'SELECT * FROM taxonomy_term_hierarchy'
];

var tables = [];
for (var i = 0; i < queries.length; i++) {
  tables.push(retrieve(queries[i]));
}

Promise.all(tables).then(function(tables) {

  var index      = tables[0];
  var vocab      = tables[1];
  var term_data  = tables[2];
  var hierarchy  = tables[3];

  console.log("INDEX: ", index[0]);
  console.log("VOCAB: ", vocab[0]);
  console.log("TERM_DATA: ", term_data[0]);
  console.log("HIERARCHY: ", hierarchy[0]);

}, function (err) {
  console.log("ERROR: ", err);
});

connection.end();
