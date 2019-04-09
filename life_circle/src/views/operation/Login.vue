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
      <div class="login-middle">
        <div class="login-middle-title">
          <h1>记录学习、记录美好生活</h1>
        </div>
        <div class="loginregist">
          <div class="loginform"></div>
          <div class="registform" :class="registclass"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  components: {
    
  },
  data() {
    return {
      LoginRegistration: '注册',
      registclass: ''
    }
  },
  methods: {
    change() {
      if(this.LoginRegistration == '注册'){
        this.LoginRegistration = '登录';
        this.registclass = 'addRegister'
      }else{
        this.LoginRegistration = '注册';
        this.registclass = 'removeRegister'
      }
    }
  }
}
</script>

<style scoped>
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
}
.login-middle-title h1 {
  color: white;
  font-weight: 600;
  font-size: 3rem;
}
@media screen and (max-width: 414px) {
    .login-middle-title h1 {
      font-size: 1.5rem;
    }
}
.loginregist {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 80%;
  background: rgba(123, 100, 200, 0.2);
  margin: 0 auto;
}
.loginform {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: black;
}
.registform {
  position: absolute;
  left: -100px;
  width: 100px;
  height: 100px;
  background-color: blue;
  /* display: none; */
}
.addRegister {
  transform: translateX(100px);
  transition: transform 0.4s;
}
.removeRegister {
  transform: translateX(0);
  transition: transform 0.4s;
}
</style>
