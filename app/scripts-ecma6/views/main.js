define(['backbone', 'react', 'reactdom', 'input', 'textModel', 'visualization'],
    (Backbone, React, ReactDOM, Input, TextModel, Visualization) => {
    
    /**
     * Main Container View
     */
    var MainView = Backbone.View.extend({
      el: '.container',
      
      initialize: function() {
        // Init text model
        this.textModel = new TextModel();

        // Listen to changes in model
        this.listenTo(this.textModel, 'change:text', this.textChanged);
        this.listenTo(this.textModel, 'change:charDict', this.updateVisualization);
        
        // Render textarea        
        this.renderTextarea();

        // Render initial visualization
        this.renderVisualization();
      },

      /**
       * Render input textarea and
       * assign model to it
       */
      renderTextarea: function() {
        // Get div with textarea
        // Needed for React component
        let container = document.getElementById('data-input');
        var inputTextarea = ReactDOM.render(<Input model={this.textModel} />, container);
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
      },

      /**
       * Render visualization 
       */
      updateVisualization: function() {
        // console.log(this.textModel.get('charDict'));
      },

      /**
       * Render visualization
       */
      renderVisualization: function() {
        let divContainer = document.getElementById('data-display');
        this.visualization = ReactDOM.render(<Visualization />, divContainer);
        console.log(this.visualization);
      }
    });

    return MainView;
});
