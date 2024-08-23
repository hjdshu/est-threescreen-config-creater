import Home from './pages/Home.vue'
import About from './pages/About.vue'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

export default new VueRouter({
  routes
})
