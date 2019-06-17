<template>
    <div class="message" :class="[animation, type]">
        <i :class="'icon-'+type"></i>
        <p class="msg">{{msg}}</p>
    </div>
</template>

<script>
export default {
  name: 'JacksonMessage',
  data () {
      return {
          animation:''
      }
  },
  props: {
      type: {
          type: String,
          default: 'info'
      },
      msg: {
          type: String,
          dafault: ''
      }
  },
  methods: {

  },
  mounted() {
      setTimeout(() => {
          this.animation = 'message_enter'
      },1000)
  }
}
</script>

<style lang="scss" scoped>
@mixin icon {
    background-size: 100% 100%;
    min-height: 30px;
    min-width: 30px;
}
.message {
    min-width: 380px;
    max-width: 380px;
    box-sizing:border-box;
    border-radius:4px;
    border:1px solid #ebeef5;
    position:fixed;
    left:50%;
    top:0px;
    transform:translateX(-50%);
    background-color:#edf2fc;
    // transition:opacity .3s,transform .4s,top .4s;
    transition: all 0.4s;
    overflow:hidden;
    padding:8px 15px 8px 15px;
    display:flex;
    align-items:center;
    opacity: 0;
    @media (max-width: 420px){
        min-width: 0;
        max-width: 80%;
        margin: 0 auto;
    }
    .msg {
        font-size: 12px;
        white-space: nowrap; 
        text-overflow: ellipsis;
        overflow: hidden;
        margin-left: 10px;
    }
    .icon-success {
        background: url('../../../assets/currency/message_img/success.png') no-repeat center;
        @include icon;
    }
    .icon-fail {
        background: url('../../../assets/currency/message_img/fail.png') no-repeat center;
        @include icon;
    }
    .icon-info {
        background: url('../../../assets/currency/message_img/info.png') no-repeat center;
        @include icon;
    }
    .icon-warn {
        background: url('../../../assets/currency/message_img/warn.png') no-repeat center;
        @include icon;
    }
}

.success {
    background-color:#f0f9eb;
    border-color:#e1f3d8;
    color:#67c23a;
}

.info {
    color:#909399;
}

.warn {
    background-color:#fdf6ec;
    border-color:#faecd8;
    color:#e6a23c;
}

.fail {
    background-color:#fef0f0;
    border-color:#fde2e2;
    color:#f56c6c;
}

.message_enter {
    opacity: 1;
    top: 25px;
    transition: all .4s;
}


</style>
