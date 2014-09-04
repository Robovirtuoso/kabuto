describe("Backbone.Router", function() {

  describe("#route", function() {
    var router;

    var TestRoute = Backbone.Router.extend({
      routes: {
        "test": "test#index"
      },

      index: function() {
        message = 'Route called';
      }
    });

    var TestController = Backbone.Controller.extend({
      register: "test",
      index: function(router) {
        message = 'Controller called';
      }
    });

    var message;

    beforeEach(function() {
      router = new TestRoute();
      Backbone.history.start({ pushState: false});
    });

    afterEach(function() {
      Backbone.history.stop();
      Backbone.Controller._classes = {};
    });
    
    it("delegates to a controller instance when a hash route is given", function() {
      Backbone.history.navigate('/test', { trigger: true });

      expect(message).toEqual('Controller called');
    });

  });

  describe("#createController", function() {

    it("instantiates a registered controller", function() {
      function test() {};

      Backbone.Controller.register('TestController', test);

      var route = new Backbone.Router();

      expect(route.createController('test').constructor).toBe(test);
    });

  });

});
