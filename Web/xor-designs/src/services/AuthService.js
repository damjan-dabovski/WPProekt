import * as firebase from 'firebase'
import axios from 'axios'
import store from '../store/store'

function loginUser (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
}

function registerUser (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      let user = response.user
      let axiosConfig = {
              method: 'POST',
              url: `http://localhost:60402/api/users`,
              data: {
                Uid: user.uid,
                UserName: user.email,
                Role: 1
              }
          }
      axios(axiosConfig).then(() => {
        console.log('User successfully logged server-side!')
      })
    })
}

function storeUserRole (serverPromise) {
    serverPromise.then(response => response.json())
    .then(data => store.commit('setRole', data.Role))
}

function resetUserRole () {
    store.commit('setRole', 1)
}

export default{
    loginUser,
    registerUser,
    storeUserRole,
    resetUserRole
}