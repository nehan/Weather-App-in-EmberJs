import Ember from 'ember';

export default Ember.ArrayController.extend({
    searchText: null,
    selectedFilterOption:null,
    searchResults: [],

    actions:{
     add_city:function(city_model){


         this.controllerFor('index').load_ajax_for_city(city_model.id,city_model.displayName,city_model.lat,city_model.lng,"create");
         this.transitionToRoute('index');
         this.set('seachResults',null);
         this.set('searchText',null);

     }

    },
    updateResults: function() {

        var self = this;
        var searchText = self.get('searchText');
        if (!searchText) {
            self.set('content','');
            return;
        }
        Ember.$.ajax({
            url: "http://coen268.peterbergstrom.com/locationautocomplete.php",
            dataType: "jsonp",
            data:{query:searchText}
        }).then(function(result) {
            var city=[];
            for(var i=0; i<result.length; i++) {
                city.push(result[i]);
            }
           self.set('content', city);

        });
    }.property('searchText')
});
