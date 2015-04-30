/**
 * Created by anurag_vz on 2/24/2015.
 */
import Ember from 'ember';

var IndexController = Ember.ArrayController.extend({

    CurrentLocationAdded:false,
    isEditing:false,
    useUSUnits:true,
    is_night_day:null,
    counter:0,
    init:function()
    {
        this._super();
        this.set('is_night_day','is-day');

    },
    geoLocation: function(location){
        var city = {};
        city.id   = "1";
        city.displayName = 'Current Location';
        city.lat  = location.coords.latitude;
        city.lng  = location.coords.longitude;

        this.load_ajax_for_city(city.id,city.displayName,city.lat,city.lng,"create",null);
    },
    load_ajax_for_city:function(cityId,cityName,latitude,longitude,create_update,store_item){

        var self=this;
        Ember.$.ajax({
            url: "https://api.forecast.io/forecast/c5f012106ffb01a1a3271b297f0917ec/" + latitude + "," + longitude+ "?units=us",
            dataType: "jsonp"
        }).then(function(result) {
          if(create_update==="create") {
               self.addCityToStore(cityId, cityName, latitude, longitude, result);
           }
           else if(create_update==="update")
           {

               store_item.set('weather',result);
               store_item.set('current_time',result.currently.time);
               store_item.set('hourly_data',(result.hourly.data).splice(1, 23));
               store_item.save();
           }

        });
    },

  addCityToStore:function(cityId,cityName,latitude,longitude,result){

      var iscurrent_city=false;
      if(cityId==="1")
      {
          iscurrent_city=true;
      }
      else
      {
          iscurrent_city=false;
      }
      var hourly_data=(result.hourly.data).splice(1, 23);
      var check_day_night=this.check_day_night(result);
      var city_data=this.store.createRecord('citymodel',{
       id:cityId,
       displayName:cityName,
       lng:latitude,
       lat:longitude,
       weather:result,
       current_time:result.currently.time,
       offset:result.offset,
       iscurrent:iscurrent_city,
       hourly_data:hourly_data,
       is_day_is_night:check_day_night
       });
       city_data.save().then(function(){console.log("done with insert");});
       this.set('CurrentLocationAdded',true);
  },
   check_day_night:function(result){

       var classNames = '';

       if(result) {
           var conditionsNow = result.hourly.data[0];
               var date          = new Date(conditionsNow.time * 1000);


           if(conditionsNow.time >= result.daily.data[0].sunriseTime && conditionsNow.time <= result.daily.data[0].sunsetTime) {
               classNames += 'is-day ';
           } else {
               classNames += 'is-night ';
           }

       }
       return classNames;
   },
    actions:{
        edit:function() {
            this.set('isEditing', true);
        },
        done:function(){
            this.set('isEditing', false);
        },
        toggeltemp:function()
        {
            this.set('useUSUnits',!this.get('useUSUnits'));
            if(this.controllerFor('city').get('useUSUnits')!==this.get('useUSUnits'))
            {
                this.controllerFor('city').set('useUSUnits',this.get('useUSUnits'));
            }

        },
        delete_city:function(param_id){
            this.store.find('citymodel', param_id).then(function(city)
            {

                city.deleteRecord();
                city.get('isDeleted'); // => true
                city.save();
            });


        }
    }

});


export default IndexController;
