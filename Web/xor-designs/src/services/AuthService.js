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

function storeUserRoleFromPromise (serverPromise) {
    serverPromise.then(response => response.json())
    .then(data => store.commit('setRole', data.Role))
}

function resetUserAndRole () {
    store.commit('setRole', 1)
    store.commit('setUser', null)
    this.setAxiosUidHeader()
}

function isLoggedIn () {
  if(store.state.user){
    return true
  }
  return false
}

function hasAdminRights () {
  return store.state.userRole == 0
}

function setAxiosUidHeader () {
  let user = store.state.user
  if(user){
    axios.defaults.headers.common['Uid'] = user.uid
  } else {
    axios.defaults.headers.common['Uid'] = null
  }
}

export default{
    loginUser,
    registerUser,
    storeUserRoleFromPromise,
    resetUserAndRole,
    isLoggedIn,
    hasAdminRights,
    setAxiosUidHeader
}