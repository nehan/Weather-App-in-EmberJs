/**
 * Created by anurag_vz on 3/3/2015.
 */
import Ember from 'ember';

export function equalCheck(left,right) {
    if( left!==right ) {
        return false;
    } else {
        return true;
    }

}

export default Ember.Handlebars.makeBoundHelper(equalCheck);
