import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'

var firebaseConfig = {
    apiKey: "AIzaSyCUp1n_Vkc13K4XYBHrVeF3us429NVGdj4",
    authDomain: "wpproekt-aa73e.firebaseapp.com",
    databaseURL: "https://wpproekt-aa73e.firebaseio.com",
    projectId: "wpproekt-aa73e",
    storageBucket: "wpproekt-aa73e.appspot.com",
    messagingSenderId: "814560913982",
    appId: "1:814560913982:web:62a9c2b51f6bf3348d3f6f"
}

firebase.initializeApp(firebaseConfig)
var database = firebase.database()

const store = new Vuex.Store({
    state: {
        database: database,
        uid: null,
        cartItems: []
    },
    actions: {},
    getters: getters,
    mutations: mutations
})

export default store
