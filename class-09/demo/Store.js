'use strict';
const hours = ['7am', '8am', '9am'];
const helper = require('./helpers.js');
console.log(helper);
function Store (location, min, max, avg) {
  this.location = location;
  this.minCustomersPerHour = min;
  this.maxCustomersPerHour = max;
  this.avgCookiesPerCustomer = avg;
  this.projections = {};
  this.projectSales();
  
  Store.stores.push(this);
};

Store.stores = [];
let temp = 2;

Store.prototype.projectSales = function() {
  console.log(temp);
  hours.forEach( (hour) => {
    this.projections[hour] = helper.randomNumberBetween(this.minCustomersPerHour, this.maxCustomersPerHour) * this.avgCookiesPerCustomer;
  });

  console.log(helper.desc);
};

  module.exports = Store;