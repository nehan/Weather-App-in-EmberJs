import Ember from 'ember';

export default Ember.Route.extend({

model:function(param) {
    this.controllerFor('city').set('current_city',param.id);
    return this.store.find('citymodel',param.id);

},
setupController:function(controller,model){
        debugger;
        controller.set('content',null);
        controller.set('content',model);
        controller.Check_Next_prev();
    }


});
