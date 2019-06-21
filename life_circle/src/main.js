import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
const confirmationmessage = (resolve) => require(['@/components/currency/confirmationmessage'],resolve)
const upperMiddleMessageTips = (resolve) => require(['@/components/currency/upperMiddleMessageTips'],resolve)
import MessageBox from '@/components/currency/messageBox/index';
import Message from '@/components/currency/message/index'

Vue.use(MessageBox);
Vue.use(Message)
Vue.component('confirmationmessage', confirmationmessage)
Vue.component('upperMiddleMessageTips', upperMiddleMessageTips)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
