<template>
  <div>
    <h1>{{post.Title}}</h1>
    <p class="has-text-grey">by {{post.AuthorName}}</p>
    <p>{{post.Content.replace(htmlEscapeRegex, '').slice(0, 100)}}</p>
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