<template>
  <div>
    <button class="button is-dark" v-if="bEditEnabled">EDIT MODE</button>

    <b-field label="Title">
      <b-input v-model="post.Title"></b-input>
    </b-field>

     <b-field label="Content">
      <b-input v-model="post.Content"></b-input>
    </b-field>

     <b-field label="Author Name">
      <b-input v-model="post.AuthorName"></b-input>
    </b-field>

    <div class="field">
      <b-switch v-model="bPreviewEnabled"
      type="is-info">
          Preview: {{bPreviewEnabled ? 'ON' : 'OFF'}}
      </b-switch>
    </div>

    <div v-if="bPreviewEnabled">
      <div v-html="post.Content"></div>
    </div>

    <b-button type="is-info" @click="submit()">Submit</b-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PostAddEdit',
    props: ['bEditEnabled'],
    data: () => {
        return {
            post: {},
            bPreviewEnabled: true
        }
    },
    created: function () {
      if (this.bEditEnabled) {
        let id = this.$route.params.id
        fetch(`http://localhost:60402/api/Posts/${id}`)
        .then(response => response.json())
        .then(data => this.post = data)
      }
    },
    methods: {
        submit() {
            let axiosConfig = {
                method: this.bEditEnabled ? 'PUT' : 'POST',
                url: `http://localhost:60402/api/Posts${this.bEditEnabled ? '/' + this.post.ID : '' }`,
                data: this.post
            }

            axios(axiosConfig).then(response => {
                console.log(response)
                this.$router.push({ name: 'Posts' })
            })
        }
    }
}
</script>

<style scoped>
</style>