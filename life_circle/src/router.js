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
      component: Home,
      meta: {
        requireAuth: true
      } // meta 内 定义进入该路由的时候是否需要进行验证是否登陆等等场景
    },
    {
      path: '/person/:uname',
      name: 'personalhomepage',
      // component: () => import('./views/PersonalHomepage')
      component: (resolve) => require(['./views/person/PersonalHomepage'],resolve)
    },
    {
      path: '/opeartion/login',
      name: 'login',
      // component: () => import('./views/operation/Login')
      component: (resolve) => require(['./views/operation/Login'],resolve)
    },
    {
      path: '/author/aboutauthor',
      name: 'aboutauthor',
      // component: () => import('./views/author/AboutAuthor')
      component: (resolve) => require(['./views/author/AboutAuthor'],resolve)
    },
    {path:'*',redirect: "/"}
  ]
})
