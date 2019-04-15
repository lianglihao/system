<template>
    <div class="myheader">
        <div class="head-logo">
           <router-link :to="{name:'login'}">
               <img src="../assets/draw.png" alt="">
           </router-link>
           <button class="menu">显示</button>
        </div>
        <div class="head-item">
            <div class="searchinput">
                <input type="text" value="" placeholder="Search or jump to...">
            </div>
            <nav class="head-item-nav">
                <router-link :to="{name:'login'}">
                    关于作者
                </router-link>
                <router-link :to="{name:'login'}">
                    关于作者
                </router-link>
                <router-link :to="{name:'login'}">
                    关于作者
                </router-link>
            </nav>
        </div>
        <div class="head-user">
            <img :src="headimg"  class="head-user-avater"  :alt="uname">
            <router-link :to="{name:'home'}">
                {{uname}}
            </router-link>
            <button class="signout">退出登录</button>
        </div>
        <!-- <button class="menu">显示</button> -->
    </div>
</template>

<script>
export default {
    name: 'myheader',
    data() {
        return {
            headimg: require('../assets/draw.png'),//引入图片
            uname: 'lianglihao'
        }
    }
}
</script>

<style scoped>
.myheader {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    /* flex-wrap: nowrap; */
    align-items: center;
    flex-wrap: wrap;
}
.head-logo {
    margin-right: 1rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
}
.head-logo .menu {
    /* position: absolute;
    right: 0; */
}
.head-logo img {
    height: 2rem;
    width: 2rem;
}
.head-item {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    flex: auto;
    flex-wrap: wrap;
}
.head-item .searchinput input {
    min-height: 1.6rem;
    width: 10rem;
    outline: none;
    border: 0;
    border-radius: 4px;
    background-color: rgba(255,255,255,.3);
    color: #fff;
    text-indent: 0.4rem;
    margin-right: 1rem;
}
.head-item .searchinput input:focus {
    color: black;
    background-color: #fff;
}
.head-item-nav {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
}
.head-item-nav a {
    margin-right: 0.6rem;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
}
.head-item-nav a:hover {
    color: pink;
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
.head-user {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
}
.head-user .head-user-avater {
    width: 2rem;
    height: 2rem;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right: 0.5rem;
    background: rgb(250, 121, 121);
}
.head-user a {
    color: #fff;
    font-weight: 500;
    text-decoration: none;
    margin-right: 0.6rem;
}
.head-user a:hover {
    color: rgb(235, 232, 232);
}
.head-user .signout {
    outline: none;
    width: 4.5rem;
    height: 2rem;
    background: none;
    color: white;
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
.head-user .signout:hover {
    background: rgb(238, 67, 67);
    border-color: rgb(238, 67, 67);
    cursor:pointer;
}
.head-user .signout:active {
    background: red;
    border-color: red;
    cursor:pointer;
    box-shadow: 2px 2px 2px #888888;
}
.menu {
    display: none;
}
@media (max-width: 1012px){
    .myheader {
        justify-content: space-between;
    }
    .head-logo {
        margin-right: 0;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    .head-item {
        display: none;
    }
    .head-user {
        display: none;
    }
    .menu {
        display: block;
    }
}
</style>

