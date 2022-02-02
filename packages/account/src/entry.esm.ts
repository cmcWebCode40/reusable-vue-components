import { App, Plugin } from 'vue';

// Import vue components
import * as components from '@/lib-components/index';
import VeridaHelper from './helpers/VeridaHelper';
import module from './module/module';

// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> = function installAccount(app: App, options: any) {
  if (!options.store) {
    throw new Error('Please provide vuex store.');
  }
  // Register toasts vuex module 
  options.store.registerModule('vdaClient', module);

  //register component

  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
  app.config.globalProperties.$VeridaHelper = VeridaHelper
  app.config.globalProperties.$vdaClient = {
    initUser: (args: any) => {
      options.store.dispatch('initUser', args);
    }
  }
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';

