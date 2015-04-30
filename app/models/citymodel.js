/**
 * Created by anurag_vz on 2/24/2015.
 */

import DS from 'ember-data';

export default DS.Model.extend({
    displayName:DS.attr('string'),
    lat:DS.attr('string'),
    lng:DS.attr('string'),
    weather:DS.attr(),
    current_time:DS.attr(),
    offset:DS.attr(),
    hourly_data:DS.attr(),
    is_day_is_night:DS.attr(),
    iscurrent: DS.attr('boolean', {
        defaultValue: function () {
            return true;
        }
    }),
    iscurrentcity: function(key, value) {

        if(value !== undefined) {
            this.set('iscurrent', value);
        }
        if(this.get('iscurrent') === 'true'|| this.get('iscurrent') === true) {
            return true;
        }
        else {
            return false;
        }
    }.property('iscurrent')


});
