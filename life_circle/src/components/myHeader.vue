<template>
    <div class="myheader">
        <div class="head-logo">
           <router-link :to="{name:'login'}">
               <img src="../assets/draw.png" alt="">
           </router-link>
           <!-- <button class="menu" @click="changeDisplay">显示</button> -->
           <img src="../assets/myheader/menu.svg" class="menu" @click="changeDisplay" alt="" >
        </div>
        <div class="head-item" :class="{displayhiding:display}">
            <div class="searchinput">
                <input @blur="loseFocus" type="text" value="" placeholder="Search or jump to...">
            </div>
            <div class="link-top"></div>
            <nav class="head-item-nav">
                <router-link :to="{path:'/'}">
                    <!-- 首页 -->
                    {{firstpage}}
                </router-link>
                <div class="link-top"></div>
                <router-link :to="{path:'/author/aboutauthor'}">
                    <!-- 添加 -->
                    {{add}}
                </router-link>
                <div class="link-top"></div>
                <router-link :to="{path:'/author/aboutauthor'}">
                    <!-- 关于作者 -->
                    {{aboutauthor}}
                </router-link>
                <div class="link-top"></div>
            </nav>
        </div>
        <div class="head-user" :class="{displayhiding:display}">
            <div class="head-user-avater-uname">
                <img :src="headimg"  class="head-user-avater"  :alt="uname">
                <router-link :to="{name:'home'}">
                    {{uname}}
                </router-link>
            </div>
            <div class="link-top"></div>
            <button class="signout" @click="signout">退出登录</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myheader',
    data() {
        return {
            // headimg: require('../assets/draw.png'),//引入图片
            headimg: localStorage.getItem('headimg'),
            uname: localStorage.getItem('uname'),
            display: true,
        }
    },
    props: {
        firstpage: String,
        add: String,
        aboutauthor: String
    },
    methods: {
        changeDisplay() {
            var that = this;
            if(this.display == true) {
                this.display = false;
                // console.log(this.display)
                this.$emit('headhanbao',that.display);
            }else {
                this.display = true;
                // console.log(this.display)
                this.$emit('headhanbao',that.display);
            }
        },
        signout() {
            localStorage.removeItem('isLogin');
            localStorage.removeItem('uname');
            localStorage.removeItem('headimg');
            this.$router.replace({name:"login"});
        },
        loseFocus() {
            console.log(111);
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
.link-top {
    width: 100%;
    height: 1px;
    border-top: solid #fff 1px;
    display: none;
}
.head-logo {
    margin-right: 1rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
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
    width: 15rem;
    transition: width 0.5s;
}
.head-item .onblur input {
    width: 20rem;
    transition: width 0.5s;
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
input:focus::-webkit-input-placeholder { color:gray;}
/* Mozilla Firefox 4 to 18 */
input:focus:-moz-placeholder { color:gray;}
/* Mozilla Firefox 19+ */
input:focus::-moz-placeholder { color:gray;}
/* Internet Explorer 10+ */
input:focus:-ms-input-placeholder { color:gray;}
 /* WebKit browsers */
input::-webkit-input-placeholder { color:#fff;}
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
.head-user .head-user-avater-uname {
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
    /* background: #f6f8fa; */
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
    cursor: pointer;
    display: none;
}
@media (max-width: 1012px){
    .myheader {
        justify-content: space-between;
    }
    .head-logo {
        margin-right: 0;
        margin-bottom: 0;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        order: 1;
    }
    .head-item {
        display: block;
        flex-direction: column;
        align-items: initial;
        width: 100%;
        order: 2;
    }
    .head-item .searchinput {
        margin-top: 1rem;
    }
    .head-item .head-item-nav {
        display: block;
        flex-direction: column;
    }
    .head-item .head-item-nav a {
        display: block;
        width: 100%;
    }
    .link-top {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        display: block;
    }
    .head-user {
        display: block;
        flex-direction: column;
        align-items: initial;
        order: 3;
        width: 100%;
    }
    .menu {
        cursor: pointer;
        display: block;
    }
    .head-item .searchinput input {
        min-height: 2rem;
        width: 100%;
        transition: none;
    }
    .head-item .searchinput input:focus {
        width: 100%;
        transition: none;
    }
}
.displayhiding {
    /* 隐藏头部展开元素 */
    display: none;
}
@media (min-width: 1013px) {
    .myheader {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        /* flex-wrap: nowrap; */
        align-items: center;
        flex-wrap: wrap;
    }
    .link-top {
        width: 100%;
        height: 1px;
        border-top: solid #fff 1px;
        display: none;
    }
    .head-logo {
        margin-right: 1rem;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
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
        transition: none;
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
    .head-user {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
    }
    .head-user .head-user-avater-uname {
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
        cursor: pointer;
    }
}

</style>

