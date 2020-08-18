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
        <!-- Comments -->
        <div v-for="(comment, listId) in post.Comments" :key="listId" style="border: 1px solid black;">
            <h1>{{comment.AuthorName}} commented on {{comment.DateCreated.split("T")[0]}}</h1>
            <p>{{comment.Content}}</p>
            <b-button @click="toggleCommentEdit(listId)" type="is-link">Edit</b-button>
            <b-button @click="deleteComment(comment.ID)" type="is-danger">Delete</b-button>

            <!-- Edit Comment input -->
            <b-field v-if="bEditComment[listId]">
                <b-input id="edit-comment" required validation-message="Your comment must have a body."
                    maxlength="500" type="textarea" v-model="editCommentText"></b-input>
                <b-button @click="submitCommentEdit(listId)">Save</b-button>
            </b-field>
        </div>
        <hr>
        <!-- New Comment input -->
        <b-field>
            <b-input id="new-comment" required validation-message="Your comment must have a body."
            maxlength="500" type="textarea" :disabled="!isLoggedIn()"
            :placeholder="isLoggedIn() ? 'Your comment here' : 'You must be logged in to comment'"
            v-model="newCommentText"></b-input>
        </b-field>
        <b-button type="is-info" @click="submitComment()">Submit</b-button>
        <router-link :to="{ name: 'Posts' }">Back to Posts</router-link>
    </div>
</template>

<script>
import CommentsService from '../../services/CommentsService.js'
import PostsService from '../../services/PostsService.js'
import AuthService from '../../services/AuthService.js'
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
            PostsService.deletePost(this.post.ID)
        },
        submitComment () {
            let newComment = document.getElementById("new-comment")
            if(newComment.checkValidity()){
                CommentsService.postComment(this.newCommentText, this.post.ID)
            }
        },
        toggleCommentEdit(id) {
            this.bEditComment[id] = !this.bEditComment[id]
            this.bEditComment = [...this.bEditComment]
            if(this.bEditComment[id]){
                this.editCommentText = this.post.Comments[id].Content
            }
        },
        submitCommentEdit(id) {
            let editCommentElement = document.getElementById("edit-comment")
            if(editCommentElement.checkValidity()){
                let sourceComment = {...this.post.Comments[id]}
                CommentsService.putComment(sourceComment, this.editCommentText)
            }
        },
        deleteComment(id) {
            CommentsService.deleteComment(id)
        },
        isLoggedIn () {
            return AuthService.isLoggedIn()
        }
    }
}
</script>

<style scoped>
</style>
