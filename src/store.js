import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentData: {},
  },
  mutations: {
    SET_PAYMENT_DATA(state, payload) {
      state.paymentData = payload;
    },
  },
  actions: {
    GET_PAYMENT_DATA(context) {
      // We check first that data is empty then we request all data from firebase.
      if (!Object.keys(context.state.paymentData).length) {
        const query = firebase.database().ref('/paymentData');
        return query.on('value', (snapshot) => {
          context.commit('SET_PAYMENT_DATA', snapshot.val());
        }, (errorObject) => {
          console.log(`The read failed: ${errorObject.code}`);
        });
      }
    },
    SET_PAYMENT_DATA(context, [id, name, description, date, amount]) {
      // We send changes on data to firebase.
      firebase.database().ref('/paymentData/' + id).set({
        Name: name,
        Description: description,
        Date: date,
        Amount: amount
      }, function(error) {
        if (error) {
          console.log(error);
        } else {
          console.log('Element Updated!');
        }
      });
    },
  },
});
