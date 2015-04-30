/**
 * Created by anurag_vz on 2/28/2015.
 */
import Ember from 'ember';

export function hourFormatter(time,offset) {

    var date = new Date(time * 1000);
    var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());
    utc.setHours(utc.getHours() + offset);
    var currentHours = utc.getHours();
    var formatter_date;
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours === 0) ? 12 : currentHours;
    formatter_date = currentHours + " " + timeOfDay;
    return formatter_date;
}

export default Ember.Handlebars.makeBoundHelper(hourFormatter);
