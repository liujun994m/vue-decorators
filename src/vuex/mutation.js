import Vue from 'vue';
import {mapMutations} from 'vuex'
import specialKeys from '../special.keys';

function makeMutationDecorator(options){
  return function(target, key){
    if(!target[specialKeys.USED_PROPS]){
      target[specialKeys.USED_PROPS] = {};
    }

    if(!target[specialKeys.MUTATIONS]){
      target[specialKeys.MUTATIONS] = {};
    }

    if(!target[specialKeys.MUTATIONS][key]){
      target[specialKeys.USED_PROPS][key] = true;
      target[specialKeys.MUTATIONS][key] = mapMutations([options || key])[options || key];
    }
  }
}

export default function(options, key, descriptor){
  if(options instanceof Vue){
    return makeMutationDecorator()(options, key);
  }

  return makeMutationDecorator(options);
};