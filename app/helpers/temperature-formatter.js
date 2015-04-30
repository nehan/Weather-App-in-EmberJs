/**
 * Created by anurag_vz on 3/4/2015.
 */
import Ember from 'ember';

export function temperatureFormatter(temp,CE_FR) {
    if(!CE_FR)
    {
        return Math.round((5.0 / 9.0) * (temp - 32.0));
    }
    else{
    return Math.round(temp);
   }

}

export default Ember.Handlebars.makeBoundHelper(temperatureFormatter);
