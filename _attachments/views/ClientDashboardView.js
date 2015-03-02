// Generated by CoffeeScript 1.6.3
var ClientDashboardView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ClientDashboardView = (function(_super) {
  __extends(ClientDashboardView, _super);

  function ClientDashboardView() {
    this.render = __bind(this.render, this);
    _ref = ClientDashboardView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ClientDashboardView.prototype.tagName = 'p';

  ClientDashboardView.prototype.render = function() {
    if (!this.model) {
      return this.$el.html(polyglot.t("Error") + ": " + polyglot.t("NoClientLoaded") + ".");
    } else {
      return this.$el.html(polyglot.t(this.model.get("Gender")) + " with pet: " + polyglot.t(this.model.get("Pet")));
    }
  };

  return ClientDashboardView;

})(Backbone.View);
