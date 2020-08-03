<template>
    <div>
        <router-link :to="{ name: 'PostEdit', params: { id: post.ID }}" class="button is-success">Edit</router-link>
        <b-button type="is-danger" @click="deletePost()">Delete</b-button>
        <h1>{{post.Title}}</h1>
        <p class="has-text-grey">by {{post.AuthorName}}</p>
        <hr>
        <p>{{post.Content}}</p>
        <hr>
        <div v-for="(comment, id) in post.Comments" :key="id" style="border: 1px solid black;">
            <h1>{{comment.AuthorName}} commented on {{comment.DateCreated.split("T")[0]}}</h1>
            <p>{{comment.Content}}</p>
        </div>
        <router-link :to="{ name: 'Posts' }">Back to Posts</router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PostDetails',
    data: () => {
        return {
            post: {}
        }
    },
    created: function () {
        let id = this.$route.params.id
        fetch(`http://localhost:60402/api/Posts/${id}`)
        .then(response => response.json())
        .then(data => this.post = data)
    },
    methods: {
        deletePost () {
            let axiosConfig = {
                method: 'DELETE',
                url: `http://localhost:60402/api/Posts/${this.post.ID}`
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
