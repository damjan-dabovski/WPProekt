<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/posts">Posts</router-link> |
      <router-link to="/products">Products </router-link>

      <span v-if="user"> || Logged in as: {{user.email}}</span>
      <a class="has-text-success" v-else @click="bLoginEnabled = !bLoginEnabled">Log in</a>
      <a v-if="user" @click="logout">Log out</a>
      <button @click="logUser()">Log user</button>
    </div>
    
    <login @login-clicked="loginClicked" v-if="bLoginEnabled"></login>
    <router-view />
  </div>
</template>

<script>
import * as firebase from 'firebase'
import Login from './components/home/Login.vue'
export default {
  name: 'App',
  components: {
    'login': Login
  },
  data: () => {
    return {
      user: firebase.auth().currentUser,
      bLoginEnabled: false
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init () {
      let user = firebase.auth().currentUser
      let store = this.$store
      if (user){
        this.user = user
        store.state.uid = user.uid
      }
    },
    loginClicked () {
      this.user = firebase.auth().currentUser
      this.bLoginEnabled = false
      this.init()
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.user = null
      })
    },
    logUser(){
      console.log(this.user)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
