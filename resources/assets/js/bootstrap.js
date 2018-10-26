import jQuery from 'jquery';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Axios from 'axios';
import notie from 'notie'
import NProgress from 'nprogress';
import Vuetify from 'vuetify';
import firebase from "firebase";
import VueRouter from 'vue-router'
import 'firebase/auth';
import storage from 'firebase/storage';
// import '../cards/jquery.card.js'


global.$ = global.jQuery = jQuery;

// M.AutoInit();
window.Vue = Vue;

window.axios = Axios;

// 
window.Vue.use(VeeValidate, { fieldsBagName: 'formFields'} );
Vue.use(Vuetify);
Vue.use(VueRouter)

var config = {
    apiKey: "AIzaSyBK5ivGSMLvkoXliSZFnLLcsWJDxrBVWJ4",
    authDomain: "smartnotice-rpi.firebaseapp.com",
    databaseURL: "https://smartnotice-rpi.firebaseio.com",
    projectId: "smartnotice-rpi",
    storageBucket: "smartnotice-rpi.appspot.com",
    messagingSenderId: "928703767687"
  };



window.firebase = firebase
window.app = firebase.initializeApp(config);
window.database = window.firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
window.database.settings(settings);

window.auth = firebase.auth();

window.storage = storage

// let persistance = firebase.auth.Auth.Persistence.SESSION;
// window.app.auth().setPersistance(persistance)

// window.auth.setPersistance(persistance)
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
};

window.NProgress = NProgress;
window.NProgress.configure({ showSpinner: false });

window.notie = notie;
window.success = (message) => {
    window.notie.alert({
        text: message,
        type: 'success'
    });
};
window.error = (message) => {
    console.log(message)
    window.notie.alert({
        text: message,
        type: 'error'
    });
};
window.info = (message) => {
    window.notie.alert({
        text: message,
        type: 'info'
    });
};