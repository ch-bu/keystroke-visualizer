/*global require*/
'use strict';

// https://github.com/tastejs/todomvc/tree/gh-pages/examples/backbone_require

require.config({

  paths: {
    underscore: 'vendor/underscore',
    jquery: 'vendor/jquery',
    backbone: 'vendor/backbone',
    react: 'vendor/react',
    reactdom: 'vendor/react-dom'
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


require(['jquery', 'backbone', 'underscore', 'react', 'reactdom'],
  function($, Backbone, _, React, ReactDOM) {

  const app = document.getElementById('test');

  class Layout extends React.Component {
    render() {
      return (
        <h1>Hello, this is React</h1>
      );
    }
  }

  ReactDOM.render(<Layout/>, app);




});
