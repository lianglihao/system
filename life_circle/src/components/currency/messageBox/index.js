import msgboxVue from './index.vue';

// 定义插件对象
const MessageBox = {};
// vue的install方法，用于定义vue插件
MessageBox.install = function (Vue, options) {
  const MessageBoxInstance = Vue.extend(msgboxVue);
  let currentMsg;
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new MessageBoxInstance();
    console.log(currentMsg)
    let msgBoxEl = currentMsg.$mount().$el;
    console.log(msgBoxEl)
    document.body.appendChild(msgBoxEl);
  };
  function showMsgBox (options) {
    if (!currentMsg) {
      initInstance();
    }
    if (typeof options === 'string') {
      currentMsg.content = options;
    } else if (typeof options === 'object') {
      Object.assign(currentMsg, options);
      // Object.assign es6 语法，将后面的合并到前面，若是相同后面覆盖前面
      // console.log(currentMsg)
    }
    return currentMsg.showMsgBox()
      .then(val => {
        currentMsg = null;
        return Promise.resolve(val);
      })
      .catch(err => {
        currentMsg = null;
        return Promise.reject(err);
      });
  }
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$msgBox = showMsgBox
};
export default MessageBox;