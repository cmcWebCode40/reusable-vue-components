import _Vue, { PluginFunction } from 'vue';


// Import vue components
import * as components from '@/lib-components/index';
import VeridaHelper from './helpers/VeridaHelper';
import module from './module/module';

// install function executed by Vue.use()
const install: PluginFunction<any> = function installVueTestLib(Vue: typeof _Vue, options: any) {
  if (!options.store) {
    throw new Error('Please provide vuex store.');
  }
  // Register toasts vuex module 
  options.store.registerModule('vdaClient', module);

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
  Vue.prototype.$VeridaHelper = VeridaHelper
  Vue.prototype.$vdaClient = {
    initUser: (args: any) => {
      options.store.dispatch('initUser', args);
    }
  }

};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "@/lib-components/index";
