<template>
  <div class="message-box" >
    <div class="mask" @click="cancel"></div>
    <div class="message-content" :style="animation">
      <!--<svg class="icon" aria-hidden="true" @click="cancel">
        <use xlink:href="#icon-delete"></use>
      </svg>-->
      <h3 class="title">{{ title }}</h3>
      <p class="content">{{ content }}</p>
      <div>
        <input type="text" v-model="inputValue" :placeholder="placeholder" v-if="isShowInput" ref="input" @keyup.enter="confirm">
      </div>
      <div class="btn-group">
        <button class="btn-default" @click="cancel" v-show="isShowCancelBtn" :disabled="isDisable">{{ cancelBtnText }}</button>
        <button class="btn-primary btn-confirm" @click="confirm" v-show="isShowConfimrBtn" :disabled="isDisable">{{ confirmBtnText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '这是弹框内容'
    },
    isShowInput: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    isShowCancelBtn: {
      type: Boolean,
      default: true
    },
    isShowConfimrBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      inputValue: '',
      resolve: '',
      reject: '',
      promise: '', // 保存promise对象
      animation: '',
      isDisable: false,
      iscancel: false // iscancel判断是否已经点击，若已经点击那将不再生效，适用于不是button的情况下
    };
  },
  methods: {
    // 确定,将promise断定为resolve状态
    confirm: function () {
      this.isDisable = true
      if (this.inputValue !== '') {
        this.resolve(this.inputValue);
      } else {
        this.resolve('confirm');
      }
      this.remove();
    },
    // 取消,将promise断定为reject状态
    cancel: function () {
      this.isDisable = true
      if (this.iscancel === false) { 
        this.iscancel = true
        this.reject('cancel');
        this.remove();
      }
    },
    showMsgBox: function () {
      this.animation = 'visibility: visible;top: 40%;transform: translate(-50%, -40%); transition: all 0.2s linear;opacity: 1;'
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      // 返回promise对象
      return this.promise;
    },
    remove: function () {
      this.animation = 'visibility: visible;top: 30%;transition: all .2s linear;opacity: 0;'
      setTimeout(() => {
          this.$destroy();
          document.body.removeChild(this.$el);
          this.iscancel = false
          this.isDisable = false
      }, 200);
    },
    // destroy: function () {
    //   this.$destroy();
    //   document.body.removeChild(this.$el);
    // }
  }
};
</script>

<style lang="scss" scoped>
.message-box {
  position: relative;
  .mask {
    height: 100vh;
    background: rgba(0,0,0,0.3);
  }
  .message-content {
    position: fixed;
    box-sizing: border-box;
    padding: 1em;
    min-width: 30em;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -30%);
    opacity: 0;
    border-radius: 0.4em;
    background: #fff;
    z-index: 50001;
    .icon {
      position: absolute;
      top: 1em;
      right: 1em;
      width: 0.9em;
      height: 0.9em;
      color: #878d99;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
    .title {
      font-size: 1.2em;
      font-weight: 600;
      margin-bottom: 1em;
    }
    .content {
      font-size: 1em;
      line-height: 2em;
      color: #555;
    }
    input {
      width: 100%;
      margin: 1em 0;
      background-color: #fff;
      border-radius: 0.4em;
      border: 1px solid #d8dce5;
      box-sizing: border-box;
      color: #5a5e66;
      display: inline-block;
      font-size: inherit;
      height: 3em;
      line-height: 1;
      outline: none;
      padding: 0 1em;
      &:focus {
        border-color: red;
      }
    }
    .btn-group {
      margin-top: 1em;
      float: right;
      overflow: hidden;
      .btn-confirm {
        margin-left: 1em;
      }
    }
  }
}
</style>