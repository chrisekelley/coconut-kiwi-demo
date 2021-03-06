// Generated by CoffeeScript 1.6.3
var StatsCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

StatsCollection = (function(_super) {
  __extends(StatsCollection, _super);

  function StatsCollection() {
    _ref = StatsCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  StatsCollection.prototype.model = Stat;

  StatsCollection.prototype.url = '/result';

  StatsCollection.prototype.parse = function(response) {
    var keys, processRow, stats, values;
    keys = [];
    values = [];
    processRow = function(obj) {
      keys.push(obj.key);
      return values.push(obj.value);
    };
    _.each(response.rows, processRow);
    stats = _.object(keys, values);
    return stats;
  };

  return StatsCollection;

})(Backbone.Collection);
