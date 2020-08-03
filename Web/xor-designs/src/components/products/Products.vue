<template>
    <div>
        <router-link :to="{ name: 'ProductAdd'}" class="button is-success">Add new</router-link>
        <div v-for="(product, id) in products" :key="id">
            <h1>{{product.Name}}</h1>
            <p>{{product.Description}}</p>
            <p class="has-text-success">{{product.Price}}</p>
            <router-link :to="{ name: 'ProductDetails', params: { id: product.ID }}">View</router-link>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Products',
    data: () => {
        return {
            products: []
        }
    },
    created: function () {
      fetch('http://localhost:60402/api/Products')
      .then(response => response.json())
      .then(data => this.products = data)
    }
}
</script>

<style scoped>
</style>