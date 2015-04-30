import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('add');
  this.resource('city', { path: '/city/:id' }, function() {});


});

export default Router;
