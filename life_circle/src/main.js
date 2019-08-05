import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// 自定义全局组件
import MessageBox from '@/components/currency/messageBox/index';
import Message from '@/components/currency/message/index'

Vue.use(MessageBox);
Vue.use(Message)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 路由跳转前钩子函数
// router.beforeEach((to,form,next) =>{
//     console.log(to.meta.requireAuth)
//     if(to.meta.requireAuth) {
//       var isLogin = localStorage.getItem("isLogin")
//       if(isLogin == "isLogin"){
//             next();
//       }else{
//           next('/opeartion/login');
//       }
//     }else {
//       next()
//     }
// })

// router.beforeEach 跳转后