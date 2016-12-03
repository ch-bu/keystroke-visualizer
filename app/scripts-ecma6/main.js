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
    input: 'templates/input'
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


require(['jquery', 'backbone', 'react', 'reactdom', 'input'],
  ($, Backbone, React, ReactDOM, Input) => {

    var MainView = Backbone.View.extend({
      el: '#test',
      
      initialize: function() {
        this.container = document.getElementById('container');

        // Render         
        this.render();
      },

      render: function() {
        ReactDOM.render(<Input/>, this.container);
      }
    });

    new MainView();
});
