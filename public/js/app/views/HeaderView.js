define([ 'marionette', 'underscore', 'text!templates/header.html', 'material', 'ripples'],
    function (Marionette, _, template, material, ripples) {
        return Marionette.ItemView.extend({

            template:_.template(template),

            ui: {
                navigation: '.navigation'
            },

            events: {
                'click @ui.navigation': 'setActiveButton'
            },

            onAttach: function(){
                $.material.init();
            },

            setActiveButton: function(e){
                this.ui.navigation.removeClass("active");
                $(e.target).parent().addClass("active");
            }

        });
    });