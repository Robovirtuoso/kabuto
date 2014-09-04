describe("Backbone.Controller", function() {

  describe(".register", function() {

    it("stores a reference to the controller's constructor by it's name", function() {
      var constructor = (function() {});

      Backbone.Controller.register('TestController', constructor);

      expect(Backbone.Controller._classes['TestController']).toEqual(constructor);
    });

    it("it registers Backbone.Controller when no controller is specified", function() {
      Backbone.Controller.register('ThisController');

      expect(Backbone.Controller._classes['ThisController']).toEqual(Backbone.Controller);
    });

    // For CoffeeScript support
    //
    // When using `register` in CoffeeScript the intent is
    // for it to be written like the following:
    //
    // class OtherController extends Backbone.Controller
    //   @register()
    //
    // Because the JavaScript that CoffeeScript generates
    // when you write `class`, `register` can grab the controller name
    // off of your class name's `name` property. It can then pass in your class'
    // constructor function as the second argument.

    it("registers by the class name and class when called with no arguments", function() {
      var TestController = (function() {
        TestController.name = 'TestController';

        function TestController() {
        };

        TestController.register = Backbone.Controller.register
        TestController.register();
        return TestController;
      })();

      expect(Backbone.Controller._classes[TestController.name]).toEqual(TestController);
    });

  });

  describe(".extend", function() {

    it("registers the controller by the `register` property supplied", function() {
      var TestController = Backbone.Controller.extend({
        register: 'test'
      });

      expect(Backbone.Controller._classes['TestController']).toEqual(TestController);
    });

  });

  describe(".constructor", function() {

    it('calls initialize with the arguments supplied', function() {
      var TestController = Backbone.Controller.extend({
        register: 'test',
        initialize: function() {
        }
      });

      spyOn(TestController.prototype, 'initialize');
      var args = {}

      new TestController(args);

      expect(TestController.prototype.initialize).toHaveBeenCalledWith(args);
    });

  });

});
