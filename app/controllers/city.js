/**
 * Created by anurag_vz on 2/28/2015.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    navNotEmpty:true,
    current_city:null,
    isPrevDisable:false,
    isNextDisable:false,
    useUSUnits:true,
    is_night_day:null,
    Dots:[],
    init:function()
    {
        this._super();
        this.set('useUSUnits',this.controllerFor('index').get('useUSUnits'));
        this.set('is_night_day','is-day');
        this.Check_Next_prev();
    },

  actions:{
      toggeltemp:function()
       {

           this.set('useUSUnits',!this.get('useUSUnits'));
           if(this.controllerFor('index').get('useUSUnits')!==this.get('useUSUnits'))
           {
               this.controllerFor('index').set('useUSUnits',this.get('useUSUnits'));
           }

       },
      get_previous_city:function(){
          this.renderPrevNav();


      },
      get_next_city:function()
      {
          this.renderNextNav();

      }
  },

    Check_Next_prev:function()
    {
        var self=this;
        var i=0;
        var index=0;
        var dots=[];
        var store_data=this.store.find('citymodel').then(function(result) {
            var array = result.content;
            if (result.length === 1) {
                self.set('navNotEmpty', false);
            }
            else {
                array.forEach(function (item) {

                    if (item.get('id') === self.get('current_city')) {
                        index = i;
                        dots.push(Ember.Object.create({
                            current:true
                        }));
                    }
                    else
                    {
                        dots.push(Ember.Object.create({
                            current:false
                        }));
                    }
                    i++;

                });
                self.set('Dots',dots);
                if ((index+1) === array.length) {
                    self.set('isNextDisable', true);
                    self.set('isPrevDisable',false);
                }
                else if (index === 0) {
                    self.set('isPrevDisable', true);
                    self.set('isNextDisable', false);
                }
                else {
                    self.set('isNextDisable', false);
                    self.set('isPrevDisable', false);
                }

            }
        });
    },

    renderNextNav:function()
    {
        var self=this;
        var i=0;
        var index=0;
        var store_data=this.store.find('citymodel').then(function(result) {
            var array = result.content;
               array.forEach(function(item) {

                    if(item.get('id')===self.get('current_city'))
                    {
                        index=i;
                    }
                    i++;

                });

                   var next= array.objectAt(index+1);
                    self.transitionToRoute('city',next.get('id'));

        });
    },
    renderPrevNav:function(){
        var self=this;
        var i=0;
        var index=0;
        var store_data=this.store.find('citymodel').then(function(result){
           var array=result.content;

               array.forEach(function(item) {

                   if(item.get('id')===self.get('current_city'))
                   {
                      index=i;
                   }
                  i++;

               });
                 var prev= array.objectAt(index-1);
                 self.transitionToRoute('city',prev.get('id'));



        });

    }
});
