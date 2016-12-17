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
    d3: 'vendor/d3',
    input: 'templates/input',
    visualization: 'templates/visualization',
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

    /**
    * Check to make sure service workers are supported in the current browser,
    *   and that the current page is accessed from a secure origin.
    */
    var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

    // Run service worker
    if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {

      navigator.serviceWorker.register('service-worker.js', {
        scope: '/keystroker'
      })
        .then((registration) => {
          console.log('Service Worker is registered');
        }).catch((e) => {
          console.error('Error during service worker registration:', e);
        });
    }
});
