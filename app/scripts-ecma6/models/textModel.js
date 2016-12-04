define(['backbone'], (Backbone) => {
    
    var TextModel = Backbone.Model.extend({
        defaults: {
            text: ''
        }
    });

    return TextModel;
});

