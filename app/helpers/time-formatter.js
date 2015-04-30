import Ember from 'ember';

export function timeFormatter(time,offset) {
    var formatted_time;
    var timeOfDay;
    var date = new Date(time * 1000);
    var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());
    utc.setHours(utc.getHours() + offset);
    var currentHours = utc.getHours();
    var currentMinutes = utc.getMinutes();
    timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours === 0) ? 12 : currentHours;
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    formatted_time = currentHours + ":" + currentMinutes + " " + timeOfDay;
    return formatted_time;
}

export default Ember.Handlebars.makeBoundHelper(timeFormatter);
