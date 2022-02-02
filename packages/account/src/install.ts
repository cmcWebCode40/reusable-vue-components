/* eslint-disable prettier/prettier*/
// import VdaAccount from './components/VdaAccount.vue';
// import VdaLogin from './components/VdaLogin.vue';
// import module from './module/module'
// Vuex toasts module

import VeridaHelper from './helpers/VeridaHelper';
// const VeridaHelper = () => import('./helpers/VeridaHelper')

export default {
	// eslint-disable-next-line prettier/prettier
	install(Vue: any, options: any) {
		if (!options.store) {
			throw new Error('Please provide vuex store.');
		}
		// Register toasts vuex module 
		options.store.registerModule('vdaClient', module);

		// Register toasts component
		Vue.component('vda-account', import('./components/VdaAccount.vue'));
		Vue.component('vda-login', import('./components/VdaLogin.vue'));

		// Adding $toasts to Vue.prototype allows us to use $toasts within Vue as this.$toasts()
		Vue.prototype.$VeridaHelper = VeridaHelper
		Vue.prototype.$vdaClient = {
			/**
			* Add
			* @desc Adds a toast notification
			* @param {object} args - Arguments for the toast
			* @param {string} args.type - The type of toast (success, error, warning)
			* @param {number} args.duration - The length of time in ms to display the toast (defaults to 4000)
			* @param {string} args.text - The text to be displayed in the toast
			**/
			initUser: (args: any) => {
				options.store.dispatch('initUser', args);
			}
		}
	}
};