<template>
  <div>
    <b-field :addons="false">
      <b-field expanded label="Email" :type="{ 'is-danger': hasError }" :message="{ 'Please provide a valid email address': hasError }">
        <b-input placeholder="Email" v-model="email" @keyup.native="enterClick($event)"></b-input>
      </b-field>
      <b-field expanded label="Password" :type="{ 'is-danger': hasError }" :message="{ 'Please input a correct password': hasError }">
        <b-input placeholder="Password" type="password" v-model="password" password-reveal @keyup.native="enterClick($event)"></b-input>
      </b-field>
    </b-field>
    <b-button id="login" style="background-color:#00bfff; color:white; font-weight:600" @click="login">Log In</b-button>
    <b-button id="register" type="is-warning" @click="register">Register</b-button>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import AuthService from '../../services/AuthService.js'
export default {
  name: "Login",
  data: () => {
      return {
          email: '',
          password: '',
          hasError: false
      }
  },
  methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((userResponse) => {
          AuthService.storeUserRoleFromPromise(fetch(`http://localhost:60402/api/users/${userResponse.user.uid}`))
          this.$store.commit('setUser', userResponse.user)
          this.$emit('login-clicked')
        })
        .catch(error => {
          console.log(error.message)
          this.hasError = true
        })
    },
    register () {
      AuthService.registerUser(this.email, this.password)
    },
    enterClick (event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        document.getElementById('login').click()
      }
    }
  }
};
</script>