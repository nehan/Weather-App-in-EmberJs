/**
 * Created by anurag_vz on 2/24/2015.
 */
import Ember from "ember";

var IndexRoute = Ember.Route.extend({

     init:function(){


         this._super();
         if (navigator.geolocation) {

             var self = this;

                 return new Ember.RSVP.Promise(function (resolve, reject) {
                     navigator.geolocation.getCurrentPosition(function (position) {
                         self.controllerFor('index').geoLocation(position);
                     });
                 });

         }


     },

model:function() {

    return this.store.find('citymodel');


},
setupController:function(controller,model){

    controller.set('content',null);
    controller.set('content',model);
    var self=this;
    if(controller.get('counter')===0) {
        Ember.run(function () {
            Ember.run.later(self, self.refresh_city_time, 60000);
            Ember.run.later(self, self.refresh, 600000);
            self.controller.set('counter', 1);
        });
    }

},
refresh_city_time:function(){
    var self=this;
    var store_data=this.store.find('citymodel').then(function(result){
        var array=result.content;
        array.forEach(function(item) {
        var current_time=item.get('current_time');
        var increment_time=current_time+60;
        item.set('current_time',increment_time);
        item.set('weather',item.get('weather'));
        item.save();
        }, array);

        Ember.run.later(self, self.refresh_city_time, 60000);
    });

},
refresh: function(){
var self=this;
var store_data=this.store.find('citymodel').then(function(result){
      var array=result.content;

    array.forEach(function(item) {
        var result=self.controller.load_ajax_for_city(item.get('id'),item.get('displayName'),item.get('lng'),item.get('lat'),"update",item);
         }, array);

    });
    Ember.run.later(self, self.refresh, 600000);
}

});

export default IndexRoute;
