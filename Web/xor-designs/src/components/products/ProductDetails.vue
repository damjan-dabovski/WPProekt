<template>
    <div>
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <router-link v-if="product" :to="{ name: 'ProductEdit', params: { id: product.ID }}" class="button is-success">Edit</router-link>
        <b-button type="is-danger" @click="deleteProduct()">Delete</b-button>
        <h1>{{product.Name}}</h1>
        <img :src="product.ImageUrl">
        <hr>
        <p>{{product.Description}}</p>
        <p class="has-text-success">${{product.Price}}</p>
        <hr>
        <router-link :to="{ name: 'Products' }">Back to Products</router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ProductDetails',
    data: () => {
        return {
            product: {},
            isLoading: true
        }
    },
    created: function () {
        let id = this.$route.params.id
        fetch(`http://localhost:60402/api/Products/${id}`)
        .then(response => response.json())
        .then(data => {
            this.isLoading = false
            this.product = data})
    },
    methods: {
        deleteProduct () {
            let axiosConfig = {
                method: 'DELETE',
                url: `http://localhost:60402/api/Products/${this.product.ID}`
            }

            axios(axiosConfig).then(response => {
                console.log(response)
                this.$router.push({ name: 'Products' })
            })
        }
    }
}
</script>

<style scoped>
</style>
