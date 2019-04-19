<template>
    <div class="home">
        <header>
            <myheader ref="headerChild" v-on:headhanbao="headhanbaoshow"></myheader>
        </header>
        <div class="home-body" ref="homebody">
            <div class="home-body-left" id="boxFixed" :class="{'isFixed':isFixed}">
                <div class="left-box">
                    <div class="head-user-avater-uname">
                        <img :src="headimg"  class="head-user-avater"  :alt="uname">
                        <h1>{{uname}}</h1>
                    </div>
                    <div class="link-top"></div>
                </div>
            </div>
            <div class="home-body-middle">
                <h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1><h1>大家好</h1>
            </div>
            <div class="home-body-right">da家好</div>
        </div>
    </div>
</template>

<script>
import myheader from '@/components/myHeader'

export default {
    name: 'home',
    components: {
        myheader: myheader
    },
    data() { 
        return {
            uname: localStorage.getItem('uname'),
            headimg: localStorage.getItem('headimg'),
            isLogin: localStorage.getItem('isLogin'),
            isFixed: false,
            offsetTop: 0
        }
    },
    mounted() {
        this.uname = this.$refs.headerChild.uname;
        this.headimg = this.$refs.headerChild.headimg;
        //获取myHeader组件内的uname（用户名）和headimg（用户头像）信息
        // console.log(this.$refs.homebody.getBoundingClientRect())
        // console.log(this.$refs.homebody.offsetTop)
        // 获取某元素距离浏览器的距离
        window.addEventListener('scroll',this.initHeight);
        this.$nextTick( () => {
            this.offsetTop = document.querySelector('#boxFixed').offsetTop;
        })
    },
    methods: {
        initHeight () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.isFixed = scrollTop > this.offsetTop ? true : false;
        },
        headhanbaoshow(data) {
            // 该方法获取子组件传过来的数据
            // console.log(data);
            this.$nextTick( () => {
                this.offsetTop = document.querySelector('#boxFixed').offsetTop;
            })
        }
    },
    watch: {
        isLogin: function() {
            console.log(1);
            if(isLogin == null){
                alert('您使用另一个选项卡或窗口退出。重新加载以刷新会话。');
            }
            this.$router.push({name:'login'});
        }
    },
    beforeRouteEnter:(to,from,next) => {
        var isLogin = localStorage.getItem("isLogin")
        if(isLogin == "isLogin"){
            next();
        }else{
            next('/opeartion/login');
        }
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>

<style scoped>
.home {
    width: 100%;
}
header {
    background-color: #00B4FF;
    color: hsla(0,0%,100%,.7);
    font-size: 1rem;
    line-height: 1.5;
    padding: 1rem;
}
@media (max-width: 1012px){
    header {
        padding: 1rem 2rem;
    }
}
.link-top {
    width: 100%;
    height: 1px;
    border-top: solid #fff 1px;
    display: block;
}
.home-body {
    min-height: 100vh;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
}
.home-body-left {
    min-height: 100vh;
    max-height: 100vh;
    width: 24%;
    background: purple;
    position: absolute;
    overflow: scroll;
}
.left-box {
    background: red;
    height: 100%;
    width: 80%;
    margin: 0 auto;
}
.head-user-avater-uname {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
}
.head-user-avater-uname h1 {
    color: #fff;
    font-weight: 500;
    text-decoration: none;
    margin-right: 0.6rem;
    font-size: 16px;
}
.head-user-avater {
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
.isFixed {
    position: fixed;
    top: 0;
}
.home-body-middle {
    margin-left: 24%;
    height: 100%;
    width: 50%;
    background: yellow;
    min-height: 100vh;
}
.home-body-right {
    height: 100%;
    width: 26%;
    background: pink;
}
</style>
