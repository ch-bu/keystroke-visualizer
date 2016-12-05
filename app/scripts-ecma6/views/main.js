define(['backbone', 'react', 'reactdom', 'input', 'textModel'],
    (Backbone, React, ReactDOM, Input, TextModel) => {
    
    /**
     * Main Container View
     */
    var MainView = Backbone.View.extend({
      el: '.container',
      
      initialize: function() {
        // Get div with textarea
        // Needed for React component
        this.container = document.getElementById('data-input');

        // Init text model
        this.textModel = new TextModel();

        // Listen to changes in model
        this.listenTo(this.textModel, 'change:text', this.textChanged);
        
        // Render textarea        
        this.renderTextarea();
      },

      /**
       * Render input textarea and
       * assign model to it
       */
      renderTextarea: function() {
        var inputTextarea = ReactDOM.render(<Input model={this.textModel} />, this.container);
      },

      /**
       * Whenever the user changes the input the visualization
       * is triggered anew
       */
      textChanged: function() {
        console.log('text changed');
      }
    });

    return MainView;

});
