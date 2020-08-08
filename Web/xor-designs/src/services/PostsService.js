import axios from 'axios'
import router from '../router/index.js'

function postPost (post) {
    let axiosConfig = {
        method: 'POST',
        url: `http://localhost:60402/api/Posts`,
        data: post
    }

    axios(axiosConfig).then(response => {
        console.log(response)
        router.push({ name: 'Posts' })
    })
}

function putPost (post) {
    let axiosConfig = {
        method: 'PUT',
        url: `http://localhost:60402/api/Posts/${post.ID}`,
        data: post
    }

    axios(axiosConfig).then(response => {
        console.log(response)
        router.push({ name: 'Posts' })
    })
}

function deletePost (postId) {
    let axiosConfig = {
        method: 'DELETE',
        url: `http://localhost:60402/api/Posts/${postId}`
    }

    axios(axiosConfig).then(response => {
        console.log(response)
        router.push({ name: 'Posts' })
    })
}

export default {
    postPost,
    putPost,
    deletePost
}