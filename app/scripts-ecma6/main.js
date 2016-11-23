/*global require*/
'use strict';

// https://github.com/tastejs/todomvc/tree/gh-pages/examples/backbone_require

require.config({

  paths: {
    underscore: 'vendor/underscore',
    jquery: 'vendor/jquery',
    backbone: 'vendor/backbone',
    // d3: 'vendor/d3',
    // handlebars: 'vendor/handlebars',
    // idb: 'vendor/idb',
    // moment: 'vendor/moment',
    // mainView: 'app/views/main',
    // templates: 'templates',
    // foodCollection: 'app/collections/food-collection',
    // foodModel: 'app/models/food-model',
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});


require(['jquery', 'backbone', 'underscore'], function($, Backbone, _) {

  console.log([1,2,3, 6].map(n => n + 1));


});
