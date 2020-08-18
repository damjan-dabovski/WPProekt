<template>
  <div>
    <button class="button is-dark" v-if="bEditEnabled">EDIT MODE</button>

    <b-field label="Name">
      <b-input v-model="product.Name"></b-input>
    </b-field>

     <b-field label="Description">
      <b-input v-model="product.Description"></b-input>
    </b-field>

    <b-field label="Image URL">
      <b-input v-model="product.ImageUrl"></b-input>
    </b-field>

     <b-field label="Price">
      <b-input v-model="product.Price"></b-input>
    </b-field>

    <b-button type="is-info" @click="submit()">Submit</b-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ProductAddEdit',
    props: ['bEditEnabled'],
    data: () => {
        return {
            product: {}
        }
    },
    created: function () {
      if (this.bEditEnabled) {
        let id = this.$route.params.id
        fetch(`http://localhost:60402/api/Products/${id}`)
        .then(response => response.json())
        .then(data => this.product = data)
      }
    },
    methods: {
        submit() {
            let axiosConfig = {
                method: this.bEditEnabled ? 'PUT' : 'POST',
                url: `http://localhost:60402/api/Products${this.bEditEnabled ? '/' + this.product.ID : '' }`,
                data: this.product
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