/**
 * Created by anurag_vz on 2/28/2015.
 */
/**
 * Created by anurag_vz on 2/28/2015.
 */
import Ember from 'ember';

export function percentFormatter(data) {
    return (data * 0.000295299830714100).toFixed(2);

}

export default Ember.Handlebars.makeBoundHelper(percentFormatter);
