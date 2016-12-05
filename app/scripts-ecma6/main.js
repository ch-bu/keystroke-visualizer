/*global require*/
'use strict';

// https://github.com/tastejs/todomvc/tree/gh-pages/examples/backbone_require

require.config({
  paths: {
    underscore: 'vendor/underscore',
    jquery: 'vendor/jquery',
    backbone: 'vendor/backbone',
    react: 'vendor/react',
    reactdom: 'vendor/react-dom',
    input: 'templates/input',
    textModel: 'models/textModel',
    mainView: 'views/main'
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


require(['jquery', 'backbone', 'mainView'],
  ($, Backbone, MainView) => {

    // Run application
    new MainView();
});
