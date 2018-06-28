/*
*  A simple Gauge object. Added as it is missing in metrics
*/

var Gauge = module.exports = function Gauge() {
  this.points = [];
  this.type = 'gauge';
}

Gauge.prototype.set = function(val, timestamp) {
  if (val) {
    this.points.push({value: val, timestamp: timestamp || new Date().getTime(), tags:{}});
  }
}

Gauge.prototype.set = function(val, timestamp, tags) {
  if (val) {
    this.points.push({value: val, timestamp: timestamp || new Date().getTime(), tags: tags});
  }
}

Gauge.prototype.clear = function() {
  this.points = [];
}

Gauge.prototype.printObj = function() {
  return {type: 'gauge', points: this.points};
}