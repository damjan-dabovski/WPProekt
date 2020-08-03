<template>
    <div>
        <router-link :to="{ name: 'PostAdd'}" class="button is-success">Add new</router-link>
        <div v-for="(post, id) in posts" :key="id">
            <h1>{{post.Title}}</h1>
            <p class="has-text-grey">by {{post.AuthorName}}</p>
            <p>{{post.Content}}</p>
            <router-link :to="{ name: 'PostDetails', params: { id: post.ID }}">Read more</router-link>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Posts',
    data: () => {
        return {
            posts: []
        }
    },
    created: function () {
      fetch('http://localhost:60402/api/Posts')
      .then(response => response.json())
      .then(data => this.posts = data)
    }
}
</script>

<style scoped>
</style>