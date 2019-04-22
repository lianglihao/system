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
                    <div class="classification">
                        <div class="classificationADD">
                            <h1>classification</h1>
                            <button @click="showAddclassificationbox"><img width="20" height="20" src="../assets/home/whrit.svg">New</button>
                        </div>
                        <div class="classificationADDonclickbox" :class="{classificationADDonclickboxPosition:classificationADDonclick}">
                            <div class="classificationADDonclick" :class="{classificationADDonclickboxTransform:classificationADDonclick}">
                                <input v-model="kind" type="text" placeholder="Add a classification...">
                                <button>Add</button>
                            </div>
                        </div>
                        <div class="classificationSearch">
                            <input v-model="kind" type="text" placeholder="Find a classification...">
                        </div>
                        <ul class="classificationContent" @click="showli">
                            <li v-for="item in this.classification" :key="item"><router-link :to="{path:'/'}"><img width="20%" height="20%" src="../assets/home/classification.svg">{{item}}</router-link></li>
                        </ul>
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
import { selectClassification } from '@/api/axios/utils'

export default {
    name: 'home',
    components: {
        myheader: myheader,
    },
    data() { 
        return {
            uname: localStorage.getItem('uname'),
            headimg: localStorage.getItem('headimg'),
            isLogin: localStorage.getItem('isLogin'),
            isFixed: false,
            offsetTop: 0,
            classificationADDonclick: false,
            classification: [],
            classificationbackups: [],
            kind: '',
        }
    },
    created() {
        
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

        selectClassification(this.uname).then( res => {
            let a = res.data[0].classification;
            this.classification = a.split('**/');
            this.classificationbackups = a.split('**/');
        })
    },
    methods: {
        initHeight() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.isFixed = scrollTop > this.offsetTop ? true : false;
        },
        headhanbaoshow(data) {
            // 该方法获取子组件传过来的数据
            // console.log(data);
            this.$nextTick( () => {
                this.offsetTop = document.querySelector('#boxFixed').offsetTop;
            })
        },
        showli(ev) {
            // 事件委托,点击分类
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase() == 'a'){
                var a = target.innerHTML;
                console.log(a.slice(a.lastIndexOf('>')+1));
            }
        },
        classificationSearch() {
            // 实现模糊查询分类
            if(this.kind == '') {
                this.classification = this.classificationbackups;
            }else {
                var _search = this.kind.toLowerCase();
                var newclassification = [];
                this.classificationbackups.filter( item => {
                    if(item.toLowerCase().indexOf(_search) !== -1) {
                        newclassification.push(item);
                    }
                })
                this.classification = newclassification;
            }
        },
        showAddclassificationbox() {
            this.classificationADDonclick = true;
        }
    },
    watch: {
        kind: function() {
            // 监听搜索框输入的变化，调用classificationSearch()方法进行模糊查询分类
            console.log(this.kind)
            this.classificationSearch();
        }
        // isLogin: function() {
        //     console.log(1);
        //     if(isLogin == null){
        //         alert('您使用另一个选项卡或窗口退出。重新加载以刷新会话。');
        //     }
        //     this.$router.push({name:'login'});
        // }
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
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
    /* display: flex;
    display: -webkit-flex;
    flex-direction: column; */
}
.head-user-avater-uname {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2rem;
}
.head-user-avater-uname h1 {
    color:black;
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
.classificationADD {
    width: 100%;
    background: yellow;
    overflow: hidden;
    /* 使用浮动的父级添加overflow: hidden;清除浮动 */
    position: relative;
    /* line-height: 250%; */
    overflow: hidden;
}
.classificationADD h1 {
    font-weight: 500;
    font-size: 1rem;
    float: left;
    margin-top: 1%;
}
.classificationADD button {
    float: right;
    height: 1.8rem;
    width: 23%;
    background: #28a745;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.8rem;
    border-radius: 5px;
    border-color: #28a745;
    outline: none;
    color: white;
    cursor: pointer;
}
.classificationADDonclickbox {
    margin-top: 2%;
    position: relative;
    width: 100%;
    height: 0rem;
    overflow: hidden;
    visibility: hidden;
}
.classificationADDonclickboxPosition {
    visibility: visible;
    height: 2rem;
    transition: all 0.5s;
}
.classificationADDonclick {
    width: 100%;
    background: yellow;
    overflow: hidden;
    /* 使用浮动的父级添加overflow: hidden;清除浮动 */
    position: relative;
    /* line-height: 250%; */
    transform: translateY(-100%);
}
.classificationADDonclickboxTransform {
    transform: translateY(0);
    transition: transform 1s;
}
.classificationADDonclick input {
    float: left;
    width: 75%;
    font-size: 1rem;
    font-weight: 500;
    height: 1.8rem;
    outline: none;
    border: 0;
    border-radius: 2px;
    background-color: #fff;
    color: black;
    text-indent: 0.4rem;
}
.classificationADDonclick button {
    float: right;
    height: 1.8rem;
    width: 23%;
    background: #28a745;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.8rem;
    border-radius: 5px;
    border-color: #28a745;
    outline: none;
    color: white;
    cursor: pointer;
}
.classificationADD button img {
    margin-top: 5%;
}
.classificationADD button:hover {
    border-color: #1c7732;
}
.classificationSearch {
    margin-top: 2%;
    width: 100%;
    background: green;
}
.classificationSearch input {
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    height: 2rem;
    outline: none;
    border: 0;
    border-radius: 2px;
    background-color: #fff;
    color: black;
    text-indent: 0.4rem;
}
.classificationContent {
    width: 100%;
    height: 100%;
    margin-top: 8%;
}
.classificationContent li {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 4%;
}
.classificationContent li a {
    font-size: 1rem;
    font-weight: 500;
    color: #0366d6;
    text-decoration: none;
}
.classificationContent li a:hover {
    text-decoration: underline;
}
.classificationContent img {
    margin-right: 4%;
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
 /* WebKit browsers */
input::-webkit-input-placeholder { color:rgb(129, 126, 126); font-size: 0.8rem; }
/* Mozilla Firefox 4 to 18 */
input:-moz-placeholder { color:rgb(129, 126, 126); font-size: 0.8rem; }
/* Mozilla Firefox 19+ */
input::-moz-placeholder { color:rgb(129, 126, 126); font-size: 0.8rem; }
/* Internet Explorer 10+ */
input:-ms-input-placeholder { color:rgb(129, 126, 126); font-size: 0.8rem; }
</style>
