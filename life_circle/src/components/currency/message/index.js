import messageVue from './index.vue'
const MessageJk = {}
let id = 1
MessageJk.install = function (Vue, options) {
    const MessageJkInstance = Vue.extend(messageVue)
    let currentMessage
    const initInstance = () => {
        currentMessage = new MessageJkInstance()
        let messageEl = currentMessage.$mount().$el
        document.body.appendChild(messageEl)
        messageEl.style.zIndex = id + 1000
        messageEl.id = 'messageJk' + id++
    }
    function showMessageJk (options) {
        initInstance()
        if (typeof options === 'string') {
            currentMessage.msg = options
        } else if (typeof options === 'object') {
            Object.assign(currentMessage, options)
        }
    }
    Vue.prototype.$messageJk = showMessageJk
}

export default MessageJk
