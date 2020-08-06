<template>
    <div>
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <router-link v-if="post" :to="{ name: 'PostEdit', params: { id: post.ID }}" class="button is-success">Edit</router-link>
        <b-button type="is-danger" @click="deletePost()">Delete</b-button>
        <h1>{{post.Title}}</h1>
        <p class="has-text-grey">by {{post.AuthorName}}</p>
        <hr>
        <p v-html="post.Content"></p>
        <hr>
        <div v-for="(comment, listId) in post.Comments" :key="listId" style="border: 1px solid black;">
            <h1>{{comment.AuthorName}} commented on {{comment.DateCreated.split("T")[0]}}</h1>
            <p>{{comment.Content}}</p>
            <b-button @click="toggleCommentEdit(listId)" type="is-link">Edit</b-button>
            <b-button @click="deleteComment(comment.ID)" type="is-danger">Delete</b-button>
            <!-- Edit Comment input -->
            <b-field v-if="bEditComment[listId]">
                <b-input id="edit-comment" required validation-message="Your comment must have a body." maxlength="500" type="textarea" placeholder="Your comment here" v-model="editCommentText"></b-input>
                <b-button @click="submitCommentEdit(listId)">Save</b-button>
            </b-field>
        </div>
        <hr>
        <b-field>
            <b-input id="new-comment" required validation-message="Your comment must have a body." maxlength="500" type="textarea" placeholder="Your comment here" v-model="newCommentText"></b-input>
        </b-field>
        <b-button type="is-info" @click="submitComment()">Submit</b-button>
        <router-link :to="{ name: 'Posts' }">Back to Posts</router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PostDetails',
    data: () => {
        return {
            post: {},
            newCommentText: "",
            editCommentText: "",
            bEditComment: [],
            isLoading: true
        }
    },
    created: function () {
        let id = this.$route.params.id
        fetch(`http://localhost:60402/api/Posts/${id}`)
        .then(response => response.json())
        .then(data => {
            this.post = data
            this.isLoading = false
            for (let i = 0; i < this.post.Comments.length; i++) {
                this.bEditComment.push(false)              
            }
        })
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
        },
        submitComment () {
            let newComment = document.getElementById("new-comment")
            if(newComment.checkValidity()){
                let axiosConfig = {
                    method: 'POST',
                    url: `http://localhost:60402/api/Comments`,
                    data: {
                        Content: this.newCommentText,
                        AuthorName: "Admin",
                        PostID: this.post.ID
                    }
                }

                axios(axiosConfig)
                .then(response => {
                    console.log(response)
                    this.$router.go()
                })
                .catch(error => console.error(error))
            }
        },
        toggleCommentEdit(id) {
            this.bEditComment[id] = !this.bEditComment[id]
            this.bEditComment = [...this.bEditComment]
            console.log(this.bEditComment)
            if(this.bEditComment[id]){
                this.editCommentText = this.post.Comments[id].Content
            }
        },
        submitCommentEdit(id) {
            let editCommentElement = document.getElementById("edit-comment")
            if(editCommentElement.checkValidity()){
                let sourceComment = {...this.post.Comments[id]}
                sourceComment.Content = this.editCommentText
                console.log(sourceComment)

                let axiosConfig = {
                    method: 'PUT',
                    url: `http://localhost:60402/api/Comments/${sourceComment.ID}`,
                    data: sourceComment
                }

                axios(axiosConfig)
                .then(response => {
                    console.log(response)
                    this.$router.go()
                })
                .catch(error => console.error(error))
            }
        },
        deleteComment(id) {
            let axiosConfig = {
                method: 'DELETE',
                url: `http://localhost:60402/api/Comments/${id}`
            }

            axios(axiosConfig).then(response => {
                console.log(response)
                this.$router.go()
            })
        }
    }
}
</script>

<style scoped>
</style>
