import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:uname',
      name: 'personalhomepage',
      component: () => import('./views/PersonalHomepage')
    },
    {
      path: '/opeartion/login',
      name: 'login',
      component: () => import('./views/operation/Login')
    },
    {
      path: '/author/aboutauthor',
      name: 'aboutauthor',
      component: () => import('./views/author/AboutAuthor')
    },
  ]
})
