import Vue from 'vue';
import * as firebase from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSort, faSortUp, faSortDown, faEdit, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import App from './App.vue';

library.add(faSort, faSortUp, faSortDown, faEdit, faCaretDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyBh4C4PrOoGt_tfxknzjF3Kgy1AlAByAKg',
  authDomain: 'britecore-75bf2.firebaseapp.com',
  databaseURL: 'https://britecore-75bf2.firebaseio.com',
  projectId: 'britecore-75bf2',
  storageBucket: 'britecore-75bf2.appspot.com',
  messagingSenderId: '478165421455',
};

firebase.initializeApp(config);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
