<template>
    <div>
        <router-link :to="{ name: 'ProductAdd'}" class="button is-success">Add new</router-link>
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
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
            products: [],
            isLoading: true
        }
    },
    created: function () {
      fetch('http://localhost:60402/api/Products')
      .then(response => response.json())
      .then((data) => {
          this.isLoading = false
          this.products = data})
    }
}
</script>

<style scoped>
</style>