import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import * as firebase from 'firebase'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
  firebase.auth().onAuthStateChanged(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
})
