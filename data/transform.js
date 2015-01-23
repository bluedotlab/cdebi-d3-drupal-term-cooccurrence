var mysql   = require('mysql');
var Promise = require("bluebird");
var config  = require('../config/config.js');
var fs      = require("fs");

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
  'SELECT * FROM node',
  'SELECT * FROM field_data_field_datasets',
  'SELECT * FROM taxonomy_term_hierarchy'
];

var tables = [];
for (var i = 0; i < queries.length; i++) {
  tables.push(retrieve(queries[i]));
}

Promise.all(tables).then(function(tables) {

  var data = {};

  data.index     = tables[0];
  data.vocab     = tables[1];
  data.terms     = tables[2];
  data.nodes     = tables[3];
  data.node_data = tables[4];
  data.hierarchy = tables[5];

  fs.writeFile('data/term-cooccur.json', JSON.stringify(data), function(err) {
    if(err) { 
      console.log(err); 
    } else {
      console.log("saved");
    }
  });

  console.log("INDEX: ", data.index[0]);
  console.log("VOCAB: ", data.vocab[0]);
  console.log("TERMS: ", data.terms[0]);
  console.log("NODES: ", data.nodes[0]);
  console.log("NODE_DATA: ", data.node_data[0]);
  console.log("HIERARCHY: ", data.hierarchy[0]);

}, function (err) {
  console.log("ERROR: ", err);
});

connection.end();
