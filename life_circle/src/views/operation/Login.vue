<template>
  <div class="login">
    <div class="content">
      <div class="login-header">
        <div class="left">
          <img src="../../assets/draw.png" alt="">
          <h1>生活圈</h1>
        </div>
        <div class="right">
          <button @click="change">{{LoginRegistration}}</button>
          <h1><router-link :to="{path:'/author/aboutauthor'}">关于作者</router-link></h1>
        </div>
      </div>
      <div class="external-headprompt">
        <div class="headprompt" :class="{headpromptdisplay:headpromptIsDisplay}">
          <span>{{headpromptMsg}}</span>
          <button @click="closeHeadprompt">X</button>
        </div>
      </div>
      <div class="login-middle">
        <div class="login-middle-title">
          <h1>记录学习、记录美好生活</h1>
        </div>
        <div class="loginregist">
          <div class="loginform" :class="loginclass">
            <form class="formlogin" @submit.prevent="login" autocomplete="off">
              <div class="formlogin-uname">
                <input ref="loginUname" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="loginUname" type="text" placeholder="账号" auto-complete="new-password">
              </div>
              <div class="formlogin-upassword">
                <input ref="loginUpassword" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="loginUpassword" type="password" placeholder="密码" auto-complete="new-password">
              </div>
              <div class="rememberforget">
                <div class="chance">
                  <input :checked="checked" type="radio" name="remember" id="rememberme" @click="chanceRemember">
                  <label for="rememberme">记住我</label>
                </div>
                <div class="forget">
                  <router-link :to="{path:'/author/aboutauthor'}">忘记密码?</router-link>
                </div>
              </div>
              <button :style="loginBtn" class="loginButton" :class="loginLoding" :disabled="disabled">
                <span>登录</span>
                <!-- <img src="../../assets/go.png" alt=""> -->
                <img src="../../assets/go.png" alt="" >
              </button>
            </form>
          </div>
          <div class="registform" :class="registclass">
            <form class="formregist" @submit.prevent="regist" autocomplete="off">
              <div class="formregist-uname">
                <input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" type="text" placeholder="用户名" auto-complete="new-password">
              </div>
              <div onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" class="formregist-uname">
                <input type="text" placeholder="账号" auto-complete="new-password">
              </div>
              <div class="formregist-upassword">
                <input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" type="password" placeholder="密码" auto-complete="new-password">
              </div>
              <button class="loginButton" :class="registLoding">
                <span>注册</span>
                <img src="../../assets/go.png" alt="">
              </button>
            </form>
          </div>
        </div>
        <div class="brief_introduction">
          <p>Record Learning, Record Good Life</p>
          <p>分享学习乐趣</p>
          <p>分享生活的点滴</p>
          <p>「Life_Circle」</p>
        </div>
      </div>
      <myfooter></myfooter>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import myfooter from '@/components/myFooter'
import { Userlogin,Userregistration } from '@/api/axios/utils'

export default {
  name: 'Login',
  components: {
    myfooter: myfooter
  },
  data() {
    return {
      LoginRegistration: '注册',
      headpromptIsDisplay: false,
      headpromptMsg: '',
      disabled: false,
      registclass: '',
      registLoding: '',
      loginclass: '',
      loginLoding: '',
      loginBtn: {
        backgroundColor: '',
        opacity: ''
      },
      checked: false,
      loginUname: localStorage.getItem('accountnumber'),
      loginUpassword: '',
    }
  },
  methods: {
    change() {
      if(this.LoginRegistration == '注册'){
        this.LoginRegistration = '登录';
        this.registclass = 'addRegister';
        this.loginclass = 'removeLogin';
      }else{
        this.LoginRegistration = '注册';
        this.registclass = 'removeRegister';
        this.loginclass = 'addLogin';
      }
    },
    chanceRemember() {
      if(this.checked == false){
        this.checked = true
      }else if(this.checked == true) {
        this.checked = false
      }
    },
    login() {
      if(this.loginUname == '' || this.loginUpassword == ''){
        this.headpromptIsDisplay = true;
        this.headpromptMsg = 'account or password cannot be empty.';
        if(this.loginUname == '') {
          this.$refs.loginUname.focus();
          //配合input标签ref属性使用
        }else if(this.loginUname != '' && this.loginUpassword == '') {
          this.$refs.loginUpassword.focus();
        }
      }else {
        this.disabled = true;
        this.loginLoding = 'loginLoding';
        this.loginBtn.opacity = '0.9';
        this.loginBtn.backgroundColor = '#72d4fd';
        Userlogin(this.loginUname,this.loginUpassword).then( res => {
          if(res == true) {
            // console.log(1);
            this.$router.replace({name:"home"});
          }else {
            this.headpromptIsDisplay = true;
            this.headpromptMsg = 'Incorrect username or password.';
            this.disabled = false;
            this.loginLoding = '';
            this.loginBtn.opacity = '';
            this.loginBtn.backgroundColor = '';
            console.log('登录失败');
          }
        },error => {
          console.log(error);
          this.disabled = false;
          this.loginLoding = '';
          this.loginBtn.opacity = '';
          this.loginBtn.backgroundColor = '';
        })
      }
    },
    regist() {
      Userregistration()
    },
    closeHeadprompt() {
      this.headpromptIsDisplay = false;
    }
  },
  watch: {
    headpromptIsDisplay: function() {
      if(this.headpromptIsDisplay == true) {
        setTimeout( () => {
          this.headpromptIsDisplay = false;
        },2000)
      }
    }
  },
  beforeRouteEnter:(to,from,next) => {
      var isLogin = localStorage.getItem("isLogin")
      if(isLogin == "isLogin"){
          next('/');
      }else{
          next();
      }
  },
}
</script>

<style scoped>
.external-headprompt {
  position: absolute;
  width: 100%;
  height: 40px;
  top: 10%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  overflow: hidden;
}
.headprompt {
  padding-left: 10px; 
  box-sizing: border-box;
  position: absolute;
  height: 40px;
  background-color: #ffdce0;
  color: #86181d;
  font-size: 0.8rem;
  line-height: 40px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #ffdce0;
  overflow: hidden;
  transform: translateY(-100%);
}
.headprompt button {
  /* margin-left: 7%; */
  outline: none;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
  border: none;
  color: #86181da6
}
.headprompt button:hover {
  color: #86181d;
}
.headpromptdisplay {
  transform: translateY(0);
  transition: transform 0.6s;
}
.login {
  height: 100vh;
  width: 100%;
  background: rgba(0,0,0,0.5);
  background-image: url(../../assets/login_bg.jpg);
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  z-index:-10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.content {
  background: rgba(0,0,0,0.3);
  height: 100vh;
  width: 100%;
  margin: 0 auto;
}
.login-header {
  position: absolute;
  top: 20px;
  height: 40px;
  width: 90%;
  margin-left: 5%;
  z-index: 100;
  font-size: 1rem;
  /* padding-left: 20px; */
  color: white;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.left h1 {
  display: inline;
}
.right h1 {
  display: inline;
}
a {
  display: inline;
  color: white;
  margin: 0;
  text-decoration: none;
  color: #eee;
}
a:hover {
  text-decoration: underline;
  color: white;
}
.login-header .left h1 {
  font-size: 1.5rem;
  font-weight: 500;
  padding-left: 4%;
}
.login-header .right h1 {
  padding-left: 4%;
  margin: 0;
}
.left img {
  height: 2rem;
  width: 2rem;
  animation: App-logo infinite 20s linear;
  /* linear保持速度一致 */
}
.left {
  width: 9.5rem;
}
.right {
  width: 9.5rem;
}
.login-header .right button {
  width: 4.5rem;
  height: 2rem;
  background: none;
  color: white;
  margin: 10px;
  border: 1px solid #fff;
  border-radius: 3px;
  /* transition:all 0.6s;
  -webkit-transition:all 0.6s; */
  transition-property: background border-color;
  -moz-transition-property: background border-color; /* Firefox 4 */
  -webkit-transition-property:background border-color; /* Safari 和 Chrome */
  -o-transition-property:background border-color; /* Opera */
  transition-duration: 0.6s;
  -moz-transition-duration: 0.6s; /* Firefox 4 */
  -webkit-transition-duration: 0.6s; /* Safari 和 Chrome */
  -o-transition-duration: 0.6s; /* Opera */
}
.login-header .right button:hover {
  background: #00B4FF;
  border-color: #00B4FF;
  cursor:pointer;
}
.login-header .right button:focus {
  outline: none;
}
.login-middle {
  height: 500px;
  width: 80%;
  z-index: 100;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -40%;
  margin-top: -250px;
  display: flex;
  flex-direction: column;
}
.login-middle-title {
  /* background: url(../../assets/logintitle.png) no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  background-position: center 0; */
  text-align: center;
  margin-bottom: 5%;
}
.login-middle-title h1 {
  color: white;
  font-weight: 600;
  font-size: 3rem;
}
.loginregist {
  position: relative;
  overflow: hidden;
  height: 45%;
  width: 80%;
  /* background: rgba(123, 100, 200, 0.2); */
  margin: 0 auto;
}
.loginform {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-color: black; */
}
.registform {
  position: absolute;
  bottom: -100%;
  width: 100%;
  height: 100%;
  /* background: rgba(123, 100, 200, 0.2); 测试用*/
  /* display: none; */
}
.addRegister {
  transform: translateY(-100%);
  transition: transform 0.4s;
  opacity: 1;
  visibility: visible;
  /* 设置元素是否可见，如果采用display:none的话会直接消失闪烁 */
}
.removeRegister {
  transform: translateY(0);
  transition: transform 0.4s;
  opacity: 1;
  visibility: hidden;
}
.addLogin {
  transform: translateY(0);
  transition: all 0.5s;
  opacity: 1;
  visibility: visible;
}
.removeLogin {
  transform: translateY(-100%);
  transition: all 0.5s;
  opacity: 1;
  visibility: hidden;
}
.formlogin {
  height: 100%;
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
.formlogin input:focus{
  background-color: #fff;
  color: black;
}
.formlogin-uname {
  text-align: center;
}
.formlogin-uname input{
  margin-bottom: 20px;
  width: 80%;
  height: 40px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  outline: none;
  color: #fff;
  background-color: rgba(255,255,255,.3);
  border: 1px solid #fff;
  border-radius: 3px;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -ms-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;
}
.formlogin-upassword {
  text-align: center;
}
.formlogin-upassword input{
  margin-bottom: 20px;
  width: 80%;
  height: 40px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  outline: none;
  color: #fff;
  background-color: rgba(255,255,255,.3);
  border: 1px solid #fff;
  border-radius: 3px;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -ms-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;
}
.formregist {
  height: 100%;
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
.formregist input:focus{
  background-color: #fff;
  color: black;
}
.formregist-uname {
  text-align: center;
}
.formregist-uname input{
  margin-bottom: 20px;
  width: 80%;
  height: 40px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  outline: none;
  color: #fff;
  background-color: rgba(255,255,255,.3);
  border: 1px solid #fff;
  border-radius: 3px;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -ms-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;
}
.formregist-upassword {
  text-align: center;
}
.formregist-upassword input{
  margin-bottom: 20px;
  width: 80%;
  height: 40px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  outline: none;
  color: #fff;
  background-color: rgba(255,255,255,.3);
  border: 1px solid #fff;
  border-radius: 3px;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -ms-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;
}
 /* WebKit browsers */
input:focus::-webkit-input-placeholder { color:transparent; }
/* Mozilla Firefox 4 to 18 */
input:focus:-moz-placeholder { color:transparent; }
/* Mozilla Firefox 19+ */
input:focus::-moz-placeholder { color:transparent; }
/* Internet Explorer 10+ */
input:focus:-ms-input-placeholder { color:transparent; }
 /* WebKit browsers */
input::-webkit-input-placeholder { color:#fff; }
/* Mozilla Firefox 4 to 18 */
input:-moz-placeholder { color:#fff; }
/* Mozilla Firefox 19+ */
input::-moz-placeholder { color:#fff; }
/* Internet Explorer 10+ */
input:-ms-input-placeholder { color:#fff; }
.rememberforget {
  width: 80%;
  height: 40px;
  margin-left: 10%;
  /* background: red; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  color: #fff;
}
.chance input {
  vertical-align: middle;
}
.chance label {
  vertical-align: middle;
  margin-left: 5px;
}
.loginButton {
  display: block;
  position: relative;
  width: 80%;
  margin-left: 10%;
  height: 36px;
  line-height: 36px;
  border-radius: 30px;
  border: 0;
  background: #00B4FF;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  font-family: "Helvetica Neue","Hiragino Sans GB","Microsoft Yahei","WenQuanYi Micro Hei",sans-serif;
  outline: none;
}
span {
  display: inline;
}
.loginButton img {
  position: absolute;
  top: 30%;
  vertical-align: middle;
  height: 1rem;
  width: 1rem;
}
.loginButton:hover img {
  /* transform: translateX(100%);
  transition: transform 0.4s; */
  animation:myloginmove 3s infinite; /* infinite无限循环 */
  -moz-animation:myloginmove 3s infinite; /* Firefox */
  -webkit-animation:myloginmove 3s infinite; /* Safari and Chrome */
  -o-animation:myloginmove 3s infinite; /* Opera */
}
@keyframes myloginmove {
  0%   {transform: translateX(0%);}
  50%  {transform: translateX(200%);}
  100% {transform: translateX(0%);}
  /* from{transform: translateX(0%);}
  to{transform: translateX(100%);} */
}

@-moz-keyframes myloginmove /* Firefox */{
  0%   {transform: translateX(0%);}
  50%  {transform: translateX(200%);}
  100% {transform: translateX(0%);}
}

@-webkit-keyframes myloginmove /* Safari and Chrome */{
  0%   {transform: translateX(0%);}
  50%  {transform: translateX(200%);}
  100% {transform: translateX(0%);}
}

@-o-keyframes myloginmove /* Opera */{
  0%   {transform: translateX(0%);}
  50%  {transform: translateX(200%);}
  100% {transform: translateX(0%);}
}
@keyframes App-logo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-moz-keyframes App-logo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes App-logo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes App-logo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.brief_introduction {
  margin-top: 2rem;
  height: 2rem;
  width: 100%;
  color: #fff;
  text-align: center;
}
.loginLoding span::after{
  content: '中...';
}
.loginLoding img{
  display: none;
}
.loginLoding:hover{
  cursor: wait;
}
@media screen and (max-width: 414px) {
    .login-middle-title h1 {
      font-size: 1.5rem;
    }
    .formlogin {
      width: 100%;
    }
    .formregist {
      width: 100%;
    }
}
</style>
