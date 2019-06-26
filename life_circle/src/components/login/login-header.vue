<template>
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
</template>

<script>
export default {
    data () {
        return {
            LoginRegistration: '注册',
        }
    }
}
</script>

<<style lang="scss" scoped>
.login-header {
  position: absolute;
  top: 20px;
  height: 40px;
  width: 90%;
  margin-left: 5%;
  z-index: 100;
  font-size: 1rem;
  color: white;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  .left h1 {
    font-size: 1.5rem;
    font-weight: 500;
    padding-left: 4%;
  }
  .right h1 {
    padding-left: 4%;
    margin: 0;
  }
  .right button {
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
    &:hover {
        background: #00B4FF;
        border-color: #00B4FF;
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
  }
}
</style>

