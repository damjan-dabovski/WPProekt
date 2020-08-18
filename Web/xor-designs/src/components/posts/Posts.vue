<template>
    <div>
        <router-link v-if="hasAdminRights()" :to="{ name: 'PostAdd'}" class="button is-success">Add new</router-link>
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
        
        <div v-if="posts.length > 0">
            <post-preview v-for="post of posts" :key="post.ID"  :prop-post="post"></post-preview>
        </div>
    </div>
</template>

<script>
import PostPreview from '../posts/PostPreview.vue'
import AuthService from '../../services/AuthService'
export default {
    name: 'Posts',
    data: () => {
        return {
            posts: [],
            htmlEscapeRegex: /(<([^>]+)>)/gi,
            isLoading: true
        }
    },
    components: {
        'post-preview' : PostPreview
    },
    created: function () {
      let url = 'http://localhost:60402/api/Posts'
      if(this.$route.query.getDrafts){
        url += '?getDrafts=true'
      }
      fetch(url)
      .then(response => response.json())
      .then((data) => {
          this.isLoading = false
          this.posts = data})
    },
    methods: {
        hasAdminRights() {
            return AuthService.hasAdminRights();
        }
    }
}
</script>

<style scoped>
</style>