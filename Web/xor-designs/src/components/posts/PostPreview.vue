<template>
  <div class="post-preview-container">
    <h1>{{post.Title}}</h1>
    <p class="has-text-grey">by {{post.AuthorName}}</p>
    <p>{{post.Content.replace(htmlEscapeRegex, '').slice(0, 97) + "..."}}</p>
    <router-link :to="{ name: 'PostDetails', params: { id: post.ID }}">Read more</router-link>
  </div>
</template>

<script>
export default {
  name: 'PostPreview',
  props: ['propPost'],
  data: () => {
    return {
      post: {},
      htmlEscapeRegex: /(<([^>]+)>)/gi
    }
  },
  created: function () {
      this.post = this.propPost
  }
}
</script>

<style scoped>
.post-preview-container{
  width: 100%;
  background-color: #f9f9f9;
  box-shadow:-5px 4px 7px -4px #0000008a;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
}

h1{
  font-size: 1.5rem;
}
</style>