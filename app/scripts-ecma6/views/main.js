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
        // Get text and split it into an array of characters
        // Lowercase characters so that case doesn't matter
        let text = this.textModel.get('text')
            .toLowerCase()
            // .replace(/[.,\/# !\d+$%\^&\*;:{}=\-_`~()]/g,"")
            .replace(/[^a-z]+/g, '')
            .split('');

        // Count number of occurences of characters in string
        // The count is passed to the d3 visualization so that it 
        // can enter and update new data
        let countCharacter = text.reduce((countMap, character) => {
            countMap[character] = ++countMap[character] || 1
            return countMap;
        }, {});

        // Set dict with character count to model and update
        this.textModel.set('charDict', countCharacter)
      }
    });

    return MainView;
});
