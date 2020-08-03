import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../components/posts/Posts.vue'
import PostDetails from '../components/posts/PostDetails.vue'
import PostAddEdit from '../components/posts/PostAddEdit.vue'
import Products from '../components/products/Products.vue'
import ProductDetails from '../components/products/ProductDetails.vue'
import ProductAddEdit from '../components/products/ProductAddEdit.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/create',
    name: 'PostAdd',
    component: PostAddEdit,
    props: { bEditEnabled: false }
  },
  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetails
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostAddEdit,
    props: { bEditEnabled: true }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/create',
    name: 'ProductAdd',
    component: ProductAddEdit,
    props: { bEditEnabled: false }
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductAddEdit,
    props: { bEditEnabled: true }
  }
]

const router = new VueRouter({
  routes
})

export default router
