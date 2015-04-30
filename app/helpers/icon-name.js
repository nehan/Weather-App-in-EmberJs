/**
 * Created by anurag_vz on 2/28/2015.
 */
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(type) {
    return new Ember.Handlebars.SafeString('<img src="images/'+ type+ '.png"></img>');
});
