# Kabuto.js

Kabuto is JavaScript library that adds Controllers to Backbone.
The way Backbone implements MVC it splits the responsibility of the controller
between the Router and the View. This makes for cluttered code that can be
confusing to use.

Backbone gives you the tools necessary to expand upon it and encourages
it in it's documentation.

## How to use

To set up a Backbone controller start by defining your router.

```js

ExampleRouter = Backbone.Router.extend({
  routes: {
    "example": "example#show"
  }
});
```

While normally the string on the right-hand side of the routes
hash will call a method on your router, if you use a Rails-style
route syntax, the router will look for an `ExampleController` and
attempt to call a `show` function on it.

```js
ExampleController = Backbone.Controller.extend({
  register: 'example',
  initialize: function() {
  },
  show: function(router) {
    // router is the instance of ExampleRouter
  }
});
```

It is a requirement that you pass `register` as a parameter to `extend`, where the value
is the lowercased version of your controller name. Without this your controller won't be
registered and the router won't know how to look it up. If you get confused about how to name it,
know that under the hood `_.str.classify(name) + 'Controller'` is being called on the value of the `register`
field.

## CoffeeScript

If you are using CoffeeScript(my personal favorite) then you need to be sure to call `register` at the class level.
Again, this registers your controller so the router knows how to lookup your controller. You don't need to pass any arguments
to `register` when you're using CoffeeScript.

```coffee
class ExampleController extends Backbone.Controller
  @register()

  initialize: ->

  show: (router) ->
    # router is the instance of your router
```

## register

If you dislike having to call `register` in all of your classes or supplying it as a property to `extend`,
you can have a registrar file dedicated to calling `Backbone.Controller.register`.

```js
// config/registrar.js

//= require controllers/

(function() {
  var registrar = {
    "ExampleController": ExampleController,
    "HomeController": HomeController,
    "AboutController": AboutController,
    "ContactController": ContactController
  };

  for (route in registrar) {
    Backbone.Controller.register(route, registrar[route]);
  }
})();
```

When manually registering controllers be sure to supply the full controller name
as the first argument to `register` and then the constructor function of the controller
you want it to instantiate as the second argument.

## Dependencies
Kabuto requires `Backbone`, `underscore` and `underscore.string` to function properly.

# Contributing

Fork it, run `npm install`, open up `spec/SpecRunner.html`, start writing tests and adding features.

# Licence

The MIT License

Copyright (c) 2014 Alex Williams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
