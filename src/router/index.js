import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateBook from '../views/CreateBook.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'CreateBook',
    component: CreateBook
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
