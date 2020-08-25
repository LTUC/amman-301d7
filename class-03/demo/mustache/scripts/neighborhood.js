'use strict';

let templateId = '#neighborhood-template';

let neighborhoods = [];

function Neighborhood (rawDataObject) {
  this.name = rawDataObject.name;
  this.city = rawDataObject.city;
  this.population = rawDataObject.population;
  this.founded = rawDataObject.founded;
  this.body = rawDataObject.body;
}

// Demo Part 1: Build it all with jQuery

// Neighborhood.prototype.toHtml = function() {
//   $('#div1').append(`<h2>${this.name}</h2> <p>Part of: ${this.city}</p> <p>Population: ${this.population}</p>`)
// };


// Demo Part 2: Use jQuery to clone
// Neighborhood.prototype.toHtml = function() {
//   let container = $('.template').clone(); // return a jQuery object
//   container.removeClass('template');
//   container.find('.name').text(this.name);
//   container.find('.city').text(this.city);
//   container.find('.population').text(this.population);
//   container.find('.founded').text(this.founded);
//   container.find('.body').text(this.body);
//   $('#neighborhoods').append(container);
//   // return container;
// };


// Demo Part 3: Mustache
Neighborhood.prototype.toHtml = function() {
  let template = $('#neighborhood-template').html(); // return a string
  let html = Mustache.render(template,this); //(string,object)
  $('#neighborhoods').append(html);
}


neighborhoodDataSet.forEach(neighborhoodObject => {
  var newObj = new Neighborhood(neighborhoodObject);
  neighborhoods.push(newObj);
  newObj.toHtml();
});

