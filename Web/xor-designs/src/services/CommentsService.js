import axios from 'axios'
import * as firebase from 'firebase'
import router from '../router/index.js'

function postComment (commentText, postId) {
    let user = firebase.auth().currentUser

    if(user){
        let axiosConfig = {
            method: 'POST',
            url: `http://localhost:60402/api/Comments`,
            data: {
                Content: commentText,
                AuthorName: user.email,
                PostID: postId
            }
        }
    
        axios(axiosConfig)
        .then(response => {
            console.log(response)
            router.go()
        })
        .catch(error => console.error(error))
    } else {
        console.error('You must be logged in to comment!')
    }
}

function putComment (commentToEdit, newContent) {
    commentToEdit.Content = newContent

    let axiosConfig = {
        method: 'PUT',
        url: `http://localhost:60402/api/Comments/${commentToEdit.ID}`,
        data: commentToEdit
    }

    axios(axiosConfig)
    .then(response => {
        console.log(response)
        router.go()
    })
    .catch(error => console.error(error))
}

function deleteComment (commentId) {
    let axiosConfig = {
        method: 'DELETE',
        url: `http://localhost:60402/api/Comments/${commentId}`
    }

    axios(axiosConfig).then(response => {
        console.log(response)
        router.go()
    })
}

export default {
    postComment,
    putComment,
    deleteComment
}