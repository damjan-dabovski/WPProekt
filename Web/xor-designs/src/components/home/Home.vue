<template>
    <div>
        <b-carousel animated="slide">
        <b-carousel-item v-for="(item, id) in carouselItems" :key="id">
            <section :class="`hero is-medium is-${item.color}`">
                <div class="hero-body has-text-centered">
                    <h1 class="title">{{item.product.Name}}</h1>
                </div>
            </section>
        </b-carousel-item>
        </b-carousel>

        <!-- <div v-for="(product, id) in hotProducts" :key="id">
            <a class="has-text-info">{{product.Name}}</a>
            <p>{{product.Description}}</p>
            <h1 class="has-text-warning">${{product.Price}}</h1>
        </div>
 -->
        <div v-if="newestPosts.length > 0">
            <post-preview v-for="post of newestPosts" :key="post.ID"  :prop-post="post"></post-preview>
        </div>

        <button @click="logUserRole()">Log user role</button>
    </div>
</template>

<script>
import PostPreview from '../posts/PostPreview.vue'
export default {
    name: 'Home',
    data: () => {
        return {
            hotProducts: [],
            newestPosts: [],
            carouselItems: []
        }
    },
    components: {
        'post-preview' : PostPreview
    },
    created: function () {
      fetch('http://localhost:60402/api/Posts/newest')
      .then(response => response.json())
      .then((data) => {
          this.newestPosts = data
        })
      
      fetch('http://localhost:60402/api/Products/hot')
      .then(response => response.json())
      .then((data) => {
          this.hotProducts = data
          for(let product of this.hotProducts){
              this.carouselItems.push({ product: product, color: 'warning' })
          }
        })
    },
    methods: {
        logUserRole () {
            console.log(this.$store.state.userRole)
        }
    }
}
</script>

<style scoped>

</style>