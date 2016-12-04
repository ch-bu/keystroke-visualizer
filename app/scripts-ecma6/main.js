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
    textModel: 'models/textModel'
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


require(['jquery', 'backbone', 'react', 'reactdom', 'input', 'textModel'],
  ($, Backbone, React, ReactDOM, Input, TextModel) => {

    /**
     * Main Container View
     */
    var MainView = Backbone.View.extend({
      el: '.container',
      
      initialize: function() {
        this.container = document.getElementById('data-input');

        // Init text model
        this.textModel = new TextModel();
        
        // Render textarea        
        this.render();
      },

      render: function() {
        var inputTextarea = ReactDOM.render(<Input model={this.textModel} />, this.container);
        console.log(inputTextarea);
      }
    });

    new MainView();
});
