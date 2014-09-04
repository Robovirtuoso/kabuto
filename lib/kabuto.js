(function (root, factory) {
  if (typeof exports === 'object' && typeof require === 'function') {
    module.exports = factory(require("backbone"), require("underscore"), require("underscore.string"));
  } else if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["backbone", "underscore", "underscore.string"], function(Backbone, _, _s) {
      // Use global variables if the locals are undefined.
      return factory(Backbone || root.Backbone, _, _s);
    });
  } else {
    factory(Backbone, root._, _.str);
  }

}(this, function(Backbone, _, _s) {
  var Kabuto = {};

  _.mixin(_s.exports());

  var origRoute = Backbone.Router.prototype.route

  Backbone.Router.prototype.route = function(route, name, callback) {
    var res;
    if (res = /(\w+)#(\w+)/.exec(name)) {
      var controller = this.createController(res[1]);
      var action = res[2]
      callback = controller[action].bind(controller, this);
    };
    origRoute.call(this, route, name, callback);
  };

  Backbone.Router.prototype.createController = function(name) {
    return new (Kabuto.Controller._classes[_.classify(name) + 'Controller']);
  };

  Kabuto.Controller = function(router) {
    this.initialize.apply(this, arguments);
  };

  Kabuto.Controller._classes = {};

  Kabuto.Controller.register = function(name, controller) {
    controller = controller || this

    var classes = Kabuto.Controller._classes;
    if (name) classes[name] = controller;
    if (this.name) classes[this.name] = controller;
  };

  Kabuto.Controller.extend = function(protoProps, staticProps) {
    // Backbone.History.extend is probably the least likely of any of the
    // extend functions to get overwritten. The original extend function
    // is hiding in a local variable in the Backbone closure.
    // The return value of this will be a subclass of Backbone.Controller.
    var child = Backbone.History.extend.call(this, protoProps, staticProps);

    // If a register property is supplied then
    // add the child as a controller to the
    // Backbone.Controller class.
    (function(register) {
      if (register) {
        var className = _.classify(register) + 'Controller';
        Kabuto.Controller.register(className, child);
      }
    })(protoProps['register'])

    return child;
  };

  _.extend(Kabuto.Controller.prototype, Backbone.Events, {
    initialize: function(options) {}
  });

  Backbone.Controller = Kabuto.Controller;

  return Backbone.Controller;
}));
