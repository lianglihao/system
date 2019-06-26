<template>
    <div class="message" :class="[type, animation]" @mouseover="mouseover" @mouseout="mouseout">
        <i :class="'icon-'+type"></i>
        <p class="msg">{{msg}}</p>
    </div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
  name: 'JacksonMessage',
  data () {
      return {
          animation: '',
          set_time: null
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
    mouseover () {
        clearTimeout(this.set_time)
        this.set_time = null
    },
    mouseout () {
        this.setTimer()
    },
    setTimer () {
        this.set_time = setTimeout(() => {
            this.animation = ''
            setTimeout(() => {
                this.$destroy()
                document.body.removeChild(this.$el)
            },400)
        },1000)
    }
  },
  mounted () {
    setTimeout(() => {
        this.animation = 'message_enter'
        this.setTimer()
    },50)
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
    border:1px solid;
    position:fixed;
    left:50%;
    top:0px;
    transform:translateX(-50%);
    // transition:opacity .3s,transform .4s,top .4s;
    transition: all 0.4s;
    overflow:hidden;
    padding:8px 15px 8px 15px;
    display:flex;
    align-items:center;
    opacity: 0;
    box-shadow:gray 0px 0px 5px;
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

.info {
    background-color:#edf2fc;
    border-color: #ebeef5;
    color: black;
}

.success {
    background-color:#f0f9eb;
    border-color:#e1f3d8;
    color:#67c23a;
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
