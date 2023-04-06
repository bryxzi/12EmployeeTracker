const Table = require('cli-table');

function createTable(headings) {
  return new Table({ head: headings });
}

function printTable(table) {
  console.log(table.toString());
}

module.exports = { createTable, printTable };
