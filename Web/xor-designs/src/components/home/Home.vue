<template>
    <div>
        <div v-for="(product, id) in hotProducts" :key="id">
            <a class="has-text-info">{{product.Name}}</a>
            <p>{{product.Description}}</p>
            <h1 class="has-text-warning">${{product.Price}}</h1>
        </div>

        <div v-if="newestPosts.length > 0">
            <post-preview v-for="post of newestPosts" :key="post.ID"  :prop-post="post"></post-preview>
        </div>
    </div>
</template>

<script>
import PostPreview from '../posts/PostPreview.vue'
export default {
    name: 'Home',
    data: () => {
        return {
            hotProducts: [],
            newestPosts: []
        }
    },
    components: {
        'post-preview' : PostPreview
    },
    created: function () {
      fetch('http://localhost:60402/api/Posts/newest')
      .then(response => response.json())
      .then((data) => {
          console.log(data)
          this.newestPosts = data
        })
      
      fetch('http://localhost:60402/api/Products/hot')
      .then(response => response.json())
      .then((data) => this.hotProducts = data)
    }
}
</script>

<style scoped>

</style>