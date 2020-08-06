<template>
  <div>
    <b-field :addons="false">
      <b-field expanded label="Email" :type="{ 'is-danger': hasError }" :message="{ 'Please provide a valid email address': hasError }">
        <b-input placeholder="Email" v-model="username" @keyup.native="enterClick($event)"></b-input>
      </b-field>
      <b-field expanded label="Password" :type="{ 'is-danger': hasError }" :message="{ 'Please input a correct password': hasError }">
        <b-input placeholder="Password" type="password" v-model="password" password-reveal @keyup.native="enterClick($event)"></b-input>
      </b-field>
    </b-field>
    <b-button id="login" style="background-color:#00bfff; color:white; font-weight:600" @click="login">Log In</b-button>
  </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: "Login",
  data: () => {
      return {
          username: '',
          password: '',
          hasError: false
      }
  },
  methods: {
      login () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
        .then((user) => {
          console.log(user)
          this.$emit('login-clicked')
        })
        .catch(error => {
          console.log(error.message)
          this.hasError = true
        })
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