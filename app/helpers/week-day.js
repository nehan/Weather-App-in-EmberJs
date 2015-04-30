/**
 * Created by anurag_vz on 2/28/2015.
 */
import Ember from 'ember';

export function weekDay(time,offset) {

    var date = new Date(time * 1000);
    var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());
    utc.setHours(utc.getHours() + offset);
    if (utc.getDay() === 1){
        return "Monday";}
    else if (utc.getDay() === 2){
        return "Tuesday";}
    else if (utc.getDay() === 3){
        return "Wednesday";}
    else if (utc.getDay() === 4){
        return "Thursday";}
    else if (utc.getDay() === 5){
        return "Friday";}
    else if (utc.getDay() === 6){
        return "Saturday";}
    else if (utc.getDay() === 0){
        return "Sunday";}
}

export default Ember.Handlebars.makeBoundHelper(weekDay);
