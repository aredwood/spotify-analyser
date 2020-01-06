import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Callback from '../views/Callback.vue'
import Dashboard from '../views/Dashboard.vue'
import Playlist from '../views/analyse/Playlist.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/analyse/playlist/:playlistId",
    name: "analysePlaylist",
    component: Playlist
  },
  {
    path: "/dashboard",
    name:'dashboard',
    component: Dashboard
  },
  {
    path:"/callback",
    name:"callback",
    component:Callback
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
