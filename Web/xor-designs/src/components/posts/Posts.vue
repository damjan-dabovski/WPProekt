<template>
    <div>
        <router-link :to="{ name: 'PostAdd'}" class="button is-success">Add new</router-link>
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
        
        <div v-if="posts.length > 0">
            <post-preview v-for="post of posts" :key="post.ID"  :prop-post="post"></post-preview>
        </div>
    </div>
</template>

<script>
import PostPreview from '../posts/PostPreview.vue'
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
      fetch('http://localhost:60402/api/Posts')
      .then(response => response.json())
      .then((data) => {
          this.isLoading = false
          this.posts = data})
    }
}
</script>

<style scoped>
</style>