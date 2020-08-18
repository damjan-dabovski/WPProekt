<template>
  <div>
    <button class="button is-dark" v-if="bEditEnabled">EDIT MODE</button>

    <b-field label="Title">
      <b-input v-model="post.Title"></b-input>
    </b-field>

     <b-field label="Content">
      <b-input type="textarea" v-model="post.Content"></b-input>
    </b-field>

    <div class="field">
      <b-switch v-model="bIsDraft"
      type="is-info">
          Save this post as a draft?
      </b-switch>
      <p class="has-text-grey" v-if="bIsDraft" style="font-style: italic;">(Draft posts will not appear until saved)</p>
    </div>

    <div class="field">
      <b-switch v-model="bPreviewEnabled"
      type="is-info">
          Preview: {{bPreviewEnabled ? 'ON' : 'OFF'}}
      </b-switch>
    </div>

    <div v-if="bPreviewEnabled">
      <div v-html="getTitleHtml() + (post.Content || '')"></div>
    </div>

    <b-button type="is-info" @click="submit()">Submit</b-button>
  </div>
</template>

<script>
import PostsService from '../../services/PostsService'
export default {
    name: 'PostAddEdit',
    props: ['bEditEnabled'],
    data: () => {
        return {
            post: {},
            bPreviewEnabled: true,
            bIsDraft: true
        }
    },
    created: function () {
      if (this.bEditEnabled) {
        let id = this.$route.params.id
        fetch(`http://localhost:60402/api/Posts/${id}`)
        .then(response => response.json())
        .then(data => {
          this.post = data
          this.bIsDraft = data.isDraft
        })
      }
    },
    methods: {
      submit() {
        this.post.isDraft = this.bIsDraft
        this.post.AuthorName = this.$store.state.user?.email || 'Admin'
        if(this.bEditEnabled){
          PostsService.putPost(this.post)
        } else {
          PostsService.postPost(this.post)
        }
      },
      getTitleHtml() {
        return `<h1>${this.post.Title || ''}</h1><br>`
      }
    }
}
</script>