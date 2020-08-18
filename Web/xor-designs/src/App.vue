<template>
  <div>
    <b-navbar shadow>
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ name: 'Index' }">
            <img src="./assets/xor_logo.png" alt="Xor Designs">
          </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item tag='router-link' :to="{ name: 'Index' }">Home</b-navbar-item>
        <b-navbar-item tag='router-link' :to="{ name: 'Posts' }">Posts</b-navbar-item>
        <b-navbar-item v-if="hasAdminRights()" tag='router-link' :to="{ name: 'Posts', query: { getDrafts: true } }">Drafts</b-navbar-item>
        <b-navbar-item tag='router-link' :to="{ name: 'Products' }">Shop</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <span v-if="user">Logged in as: {{user.email}}</span>
          <span @click="logout()" v-if="user" style="margin-left: 1rem; opacity:60%; cursor: pointer;">Log out</span>
          <div @click="bLoginEnabled = !bLoginEnabled" class="login-toggle">
            <i class="fa fa-user"></i>
          </div>
          <login class="login" @login-clicked="loginClicked" v-if="bLoginEnabled"></login>
        </b-navbar-item>
      </template>
    </b-navbar>

    <router-view :key="$route.fullPath" class="container" />
  </div>
</template>

<script>
import * as firebase from 'firebase'
import Login from './components/home/Login.vue'
import AuthService from './services/AuthService.js'
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
      if (user){
        this.user = user
        this.$store.commit('setUser', user)
        AuthService.storeUserRoleFromPromise(fetch(`http://localhost:60402/api/users/${user.uid}`))
        AuthService.setAxiosUidHeader()
      }
    },
    loginClicked () {
      this.bLoginEnabled = false
      this.init()
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.user = null
        AuthService.resetUserAndRole()
      })
    },
    hasAdminRights() {
      return AuthService.hasAdminRights()
    }
  }
}
</script>

<style>
.navbar-menu, .navbar-brand{
  background: #e08123;
  font-family: monospace;
  font-weight: 600;
  font-size: 1.2rem;
}

a.navbar-item:hover, a.navbar-item:focus, a.navbar-item:active{
  background: #e08123!important;
  color: white!important;
}

.router-link-exact-active{
  color: white!important;
  background: #e08123!important;
  text-decoration: underline;
}

.navbar-item img {
  max-height: 2.2rem!important;
}

.navbar-end .navbar-item{
  padding: 0;
}

.login-toggle {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem 0 1rem;
  margin-left: 1rem;
  color: white;
  background-color: #333;
  cursor: pointer;
}

.login {
  position: absolute;
  top: 100%;
  right: 0%;
}
</style>
