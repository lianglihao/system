<template>
    <div class="home" :style="home">
        <header>
            <myheader ref="headerChild" v-bind="head" v-on:headhanbao="headhanbaoshow"></myheader>
        </header>
        <div class="home-body allbgcolor" ref="homebody">
            <div class="home-body-left" id="boxFixed" :class="{'isFixed':isFixed}">
                <div class="left-box">
                    <div class="head-user-avater-uname">
                        <div class="head-user-avater-unameleft">
                            <img :src="headimg"  class="head-user-avater"  :alt="uname">
                            <h1>{{uname}}</h1>
                        </div>
                        <div class="head-user-avater-unameright" style="display:none">
                            {{headuseravaterunamerightmsg}}
                        </div>
                    </div>
                    <div class="link-top"></div>
                    <div class="classification">
                        <div class="classificationADD">
                            <h1>classification</h1>
                            <button @click="showAddclassificationbox">New</button>
                        </div>
                        <div class="classificationADDonclickbox" :class="{classificationADDonclickboxPosition:classificationADDonclick}">
                            <div class="classificationADDonclick" :class="{classificationADDonclickboxTransform:classificationADDonclick}">
                                <input ref="addclassification" v-model="kindOfadd" type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="Add a classification...">
                                <button @click="addClassification">Add</button>
                            </div>
                        </div>
                        <div class="classificationSearch">
                            <input v-model="kind" type="text" placeholder="Find a classification...">
                        </div>
                        <ul :style="leftBoxul" class="classificationContent" @click="showli">
                            <li v-for="(item,index) in this.classification" :key="index" class="linoactive" :class="[liactiveClass == index ? 'liactive' : '']" >
                                <router-link :to="{path:'/'}"><img :alt="item" width="23" height="23" src="../assets/home/classification.svg">{{item}}</router-link>
                            </li>
                        </ul>
                        <div class="link-top"></div>
                        <div class="left-box-end">
                            <p>创建新的分类开始记录吧！！！</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home-body-middle">
                <div class="middle-box">
                    <div :style="middleloading" class="middle-box-loading">
                        <img src="../assets/draw.png">
                        <p style="color:grey">加载中...</p>
                    </div>
                </div>
                <div class="suspensionbtn" v-show="isdeletekind">
                    <suspension suspensionbtn='delete' @click.native="deletekind" style="margin-right:10px;">删除分类</suspension>
                    <suspension suspensionbtn='add' @click.native="add">新的分享</suspension>
                </div>
                <div v-if="middlecontent == ''" class="middleTitle">
                    <p>{{noDateTips}}</p>
                </div>
                <div v-else class="middleTitle">
                    <div v-for=" (item,index) in getMiddlecontent" :key="index">
                        <div class="middleTitleTop">
                            <div class="middleTitleleft">
                                <router-link :to="{path:`/${item.uname}`}"><img :src="item.headimg" class="middle-user-avater"></router-link>
                            </div>
                            <div class="middleTitleright">
                                <div class="middleTitlerightTop">
                                    {{item.uname}} <span style="font-weight:500">分享于</span>{{item.dateTim}}
                                </div>
                                <div class="middleTitlerightMiddle">
                                    <div class="middleTitlerightMiddleTop">
                                        <div class="titleLeft">
                                            <p style="font-weight:500">{{item.title}}</p>
                                        </div>
                                        <div class="starClick">
                                            <button @click="starorunstar(index)"><img src="../assets/home/star__.svg" width="15"><span>{{item.isStar}}</span></button>
                                        </div>
                                    </div>
                                    <div class="middleTitlerightMiddleBottom">
                                        <div :style="item.color" class="circular"></div>
                                        <router-link :to="{path:'/'}">{{item.kind}}</router-link>
                                        <img src="../assets/home/star__.svg" width="16" height="16" style="margin-left:4%">
                                        <p style="margin-left:8px;margin-top: 2px;">{{item.star}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="middlecontentDivide"></div>
                    </div>
                    <div class="middlefooter">
                        <p class="foo">&copy; 2018-2019 Lifr_Circle <a href="https://github.com/lianglihao" title="开发者github" target="_blank">开发者：LHJs</a>  <a href="http://www.miitbeian.gov.cn" title="工信部首页链接" target="_blank">浙ICP备18051718号-1</a></p>
                    </div>
                </div>
            </div>
            <div class="home-body-right">da家好</div>
        </div>
    </div>
</template>

<script>
import myheader from '@/components/currency/myHeader'
import suspension from '@/components/home/suspension'
import { selectClassification,addKind,getContentforKind,additionOrsubtractionStar } from '@/api/axios/utils'
import { randomColors } from '@/api/simpleTools/utils'

export default {
    name: 'home',
    components: {
        myheader,
        suspension
    },
    data() { 
        return {
            head: {
                firstpage: '首页',
                add: '添加',
                aboutauthor: '关于作者'
            },
            home: '',
            headuseravaterunamerightmsg: '',
            uname: localStorage.getItem('uname'),
            headimg: localStorage.getItem('headimg'),
            isLogin: localStorage.getItem('isLogin'),
            isFixed: false,
            offsetTop: 0,
            classificationADDonclick: false,
            classification: [],
            classificationbackups: [],
            kindOfadd: '',
            kind: '',
            liactiveClass: 0,
            activekind: '',
            leftBoxul: '',
            middleloading: 'display:none',
            middlecontent: '',
            noDateTips: '',
            isdeletekind: false
            // test: {
            //     a:1
            // }
        }
    },
    created() {
        
    },
    mounted() {
        // this.uname = this.$refs.headerChild.uname;
        // this.headimg = this.$refs.headerChild.headimg;
        // 获取myHeader组件内的uname（用户名）和headimg（用户头像）信息
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
            this.middleloading = '';
            this.activekind = this.classificationbackups[0];
            getContentforKind(this.classificationbackups[0],this.uname).then( res => {
                // var data = res.data[0].dateTim;
                // console.log(data.split(' '));
                if(res.data.length == 0) {
                    this.noDateTips = '目前该分类没有任何分享，快去分享吧！';
                }
                this.middlecontent = res.data;
                var now = String(new Date()).split(' ');
                var nowYear = now[3];
                var nowMonth = now[1];
                var nowDay = now[2]
                for(var data of this.middlecontent){
                    data.color = randomColors();
                    var isStar = data.praiseUsers.split('**/');
                    if(isStar.indexOf(this.uname) != -1) {
                        data.isStar = 'Unstar';
                    }else {
                        data.isStar = 'Star';
                    }
                    if(data.dateTim.split(' ')[1] == nowMonth && data.dateTim.split(' ')[2] == nowDay && data.dateTim.split(' ')[3] == nowYear) {
                        data.dateTim = ` ${data.dateTim.split(' ')[4]}`;
                    }else if(data.dateTim.split(' ')[1] == nowMonth && data.dateTim.split(' ')[2] != nowDay && data.dateTim.split(' ')[3] == nowYear) {
                        data.dateTim = ` ${nowDay-data.dateTim.split(' ')[2]}天前`;
                    }else if(data.dateTim.split(' ')[1] != nowMonth && data.dateTim.split(' ')[3] == nowYear) {
                        data.dateTim = ` ${data.dateTim.split(' ')[2]} ${ data.dateTim.split(' ')[1]}`;
                    }else if(data.dateTim.split(' ')[3] != nowYear) {
                        data.dateTim = ` ${data.dateTim.split(' ')[2]} ${ data.dateTim.split(' ')[1]} ${ data.dateTim.split(' ')[3]}`;
                    }
                }
                this.isdeletekind = true;
                this.middleloading = 'display:none';
                console.log(this.middlecontent);
            })
        }).catch( error => {
            this.headimg = require('../assets/myheader/nowifi.png');
            this.$refs.headerChild.headimg = require('../assets/myheader/nowifi.png');
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
            // ev.stopPropagation();
            this.isdeletekind = false;
            // 当点击的时候禁止其他按钮点击
            this.leftBoxul = 'pointer-events:none';
            // 事件委托,点击分类
            this.middlecontent = '';
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if(target.nodeName === 'UL') {
                // ul设置事件委托后，点击空白处出bug，没有找到解决方法，自行采用了这个方法，应该不是最优解决方案
                console.log('点击了空白处')
                this.middleloading = 'display:none';
                this.leftBoxul = '';
                this.isdeletekind = true;
                ev.stopPropagation();
            }else {
                var value = ''
                if(target.nodeName.toLowerCase() == 'a') {
                    value = target.innerHTML.slice(target.innerHTML.lastIndexOf('>')+1);
                }else if(target.nodeName.toLowerCase() == 'img') {
                    value = target.alt
                }
                this.activekind = value;
                var index = this.classification.indexOf(value);
                this.liactiveClass = index;
                this.middleloading = '';
                this.noDateTips = '';
                getContentforKind(value,this.uname).then( res => {
                    if(res.data.length == 0) {
                        this.noDateTips = '目前该分类没有任何分享，快去分享吧！';
                    }
                    this.middlecontent = res.data;
                    var now = String(new Date()).split(' ');
                    var nowYear = now[3];
                    var nowMonth = now[1];
                    var nowDay = now[2]
                    for(var data of this.middlecontent){
                        data.color = randomColors();
                        var isStar = data.praiseUsers.split('**/');
                        if(isStar.indexOf(this.uname) != -1) {
                            data.isStar = 'Unstar';
                        }else {
                            data.isStar = 'Star';
                        }
                        if(data.dateTim.split(' ')[1] == nowMonth && data.dateTim.split(' ')[2] == nowDay && data.dateTim.split(' ')[3] == nowYear) {
                            data.dateTim = ` ${data.dateTim.split(' ')[4]}`;
                        }else if(data.dateTim.split(' ')[1] == nowMonth && data.dateTim.split(' ')[2] != nowDay && data.dateTim.split(' ')[3] == nowYear) {
                            data.dateTim = ` ${nowDay-data.dateTim.split(' ')[2]}天前`;
                        }else if(data.dateTim.split(' ')[1] != nowMonth && data.dateTim.split(' ')[3] == nowYear) {
                            data.dateTim = ` ${data.dateTim.split(' ')[2]} ${ data.dateTim.split(' ')[1]}`;
                        }else if(data.dateTim.split(' ')[3] != nowYear) {
                            data.dateTim = ` ${data.dateTim.split(' ')[2]} ${ data.dateTim.split(' ')[1]} ${ data.dateTim.split(' ')[3]}`;
                        }
                    }
                    this.middleloading = 'display:none';
                    this.leftBoxul = '';
                    this.isdeletekind = true;
                })  
            }
        },
        classificationSearch() {
            // 实现模糊查询分类
            if(this.kind == '') {
                this.liactiveClass = this.classificationbackups.indexOf(this.activekind);
                this.classification = this.classificationbackups;
                console.log(this.classificationbackups.indexOf(this.activekind))
                console.log(this.classificationbackups)
                console.log(this.activekind)
            }else {
                var _search = this.kind.toLowerCase();
                var newclassification = [];
                this.classificationbackups.filter( item => {
                    if(item.toLowerCase().indexOf(_search) !== -1) {
                        newclassification.push(item);
                    }
                })
                this.classification = newclassification;
                this.liactiveClass = this.classification.indexOf(this.activekind);
            }
        },
        showAddclassificationbox() {
            if(this.classificationADDonclick == true) {
                this.classificationADDonclick = false;
            }else {
                this.classificationADDonclick = true;
            }
        },
        addClassification() {
            if(this.kindOfadd == ''){
                this.$refs.addclassification.focus();
            }else {
                var result = this.classificationbackups.filter( item => {
                    return item == this.kindOfadd;
                })
                if(result != null && result.length > 0) {
                    this.$refs.addclassification.focus();
                }else {
                    var oldclassificationbackups = this.classificationbackups;
                    this.classificationbackups.push(this.kindOfadd);
                    var classification = this.classificationbackups.join('**/');
                    addKind(this.uname,classification).then( res => {
                        console.log(res.status);
                        if(res.status = 200) {
                            this.classification = this.classificationbackups;
                            this.classificationADDonclick = false;
                            console.log('success');
                        }else {
                            this.classificationbackups = oldclassificationbackups;
                            this.$refs.addclassification.focus();
                        }
                    })
                }
            }
        },
        starorunstar(index) {
            // 点击喜欢或者取消喜欢
            if(this.middlecontent[index].isStar == 'Star'){
                var obj = this.middlecontent[index];
                obj.isStar = 'Unstar';
                if(obj.star == 0) {
                    obj.praiseUsers = this.uname;
                }else {
                    obj.praiseUsers = obj.praiseUsers.concat(`**/${this.uname}`);
                }
                obj.star ++;
                this.$set(this.middlecontent,index,obj);
                additionOrsubtractionStar(obj.star,obj.praiseUsers,obj.id).then( res => {
                    console.log(res);
                })
            }else {
                var obj = this.middlecontent[index];
                obj.isStar = 'Star';
                var arr = obj.praiseUsers.split('**/');
                var indexuname = arr.indexOf(this.uname);
                arr.splice(indexuname,1);
                obj.praiseUsers = arr.join('**/');
                obj.star --;
                this.$set(this.middlecontent,index,obj);
                additionOrsubtractionStar(obj.star,obj.praiseUsers,obj.id).then( res => {
                    console.log(res);
                })
            }
        },
        deletekind() {
            // this.home = 'position:fixed;width:100%;';
            console.log('点击删除')
            this.$messageJk({
                msg: '密码错误',
                type: 'success'
            })
        },
        add () {
            this.$messageJk({
                msg: '密码正确',
                type: 'fail'
            })
        }
    },
    computed:{
        getMiddlecontent() {
            return this.middlecontent;
        }
    },
    watch: {
        // test: { 想要监听对象的话，需要设置深度查询
        //     handler:function(aaa) {
        //         console.log(aaa.a,2222)
        //     },
        //     deep:true
        // },
        // 'test.a':function(aaa){
        //     console.log(aaa,222)
        // },
        kind: function(aaa,bbb) {
            console.log(aaa,bbb)
            // this.test.a = aaa;
            // console.log(this.test.a,111)
            // 监听搜索框输入的变化，调用classificationSearch()方法进行模糊查询分类
            this.classificationSearch();
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
.allbgcolor {
    background-color: #f6f8fa;
}
.home {
    width: 100%;
    height: 100%;
}
header {
    background-color: #00B4FF;
    color: hsla(0,0%,100%,.7);
    font-size: 1rem;
    line-height: 1.5;
    padding: 1rem;
}
.link-top {
    width: 100%;
    height: 1px;
    border-top: solid #d1d5da 1px;
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
    width: 20%;
    position: absolute;
    overflow: auto;
    background: #fff;
    border-right: 1px solid #e1e4e8!important;
}
.left-box {
    height: 100%;
    width: 80%;
    margin: 2% auto;
    background-color: #fff;
}
.head-user-avater-uname {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 98%;
    margin: 0 auto;
    margin-top: 1rem;
}
.head-user-avater-uname h1 {
    color:black;
    font-weight: 500;
    text-decoration: none;
    margin-right: 0.6rem;
    font-size: 16px;
}
.head-user-avater-unameleft {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    float: left;
}
.head-user-avater-unameright {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    float: right;
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
    background: #f6f8fa;
}
.classificationADD {
    width: 98%;
    height: 2rem;
    overflow: hidden;
    /* 使用浮动的父级添加overflow: hidden;清除浮动 */
    position: relative;
    /* line-height: 250%; */
    margin: 0 auto;
    line-height: 2rem;
}
.classificationADD h1 {
    font-weight: 500;
    font-size: 1rem;
    float: left;
    
}
.classificationADD button {
    float: right;
    height: 2rem;
    width: 30%;
    background: #28a745;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 2rem;
    border-radius: 5px;
    border-color: #28a745;
    outline: none;
    color: white;
    cursor: pointer;
}
.classificationADDonclickbox {
    margin: 0 auto;
    margin-top: 2%;
    position: relative;
    width: 98%;
    height: 0rem;
    overflow: hidden;
    visibility: hidden;
}
.classificationADDonclickboxPosition {
    visibility: visible;
    height: 2.1rem;
    transition: all 0.2s linear;
}
.classificationADDonclick {
    width: 100%;
    overflow: hidden;
    /* 使用浮动的父级添加overflow: hidden;清除浮动 */
    position: relative;
    transform: translateY(-100%);
}
.classificationADDonclickboxTransform {
    transform: translateY(0);
    transition: transform 0.2s linear;
}
.classificationADDonclick input {
    float: left;
    width: 65%;
    font-size: 1rem;
    font-weight: 500;
    height: 1.9rem;
    outline: none;
    background-color: #fff;
    color: black;
    text-indent: 0.4rem;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
}
.classificationADDonclick button {
    float: right;
    height: 2rem;
    width: 30%;
    background: #28a745;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 2rem;
    border-radius: 5px;
    border-color: #28a745;
    outline: none;
    color: white;
    cursor: pointer;
}
.classificationADDonclick button:hover {
    border-color: #00B4FF;
}
.classificationADD button img {
    margin-top: 5%;
}
.classificationADD button:hover {
    border-color: #00B4FF;
}
.classificationSearch {
    margin: 0 auto;
    margin-top: 2%;
    width: 98%;
}
.classificationSearch input {
    width: 99%;
    font-size: 1rem;
    font-weight: 500;
    height: 1.9rem;
    outline: none;
    background-color: #fff;
    color: black;
    text-indent: 0.4rem;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
}
.classificationContent {
    margin: 0 auto;
    width: 98%;
    height: 100%;
    margin-top: 8%;
    overflow: hidden;
}
.classificationContent li {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 2%;
    height: 24px;
    width: 100%;
}
.classificationContent li a {
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    display: block;
}
.classificationContent li a:hover {
    text-decoration: underline;
}
.classificationContent img {
    margin-right: 4%;
}
.classificationContent span {
    height: 1rem;
    width: 1rem;
    margin-top: 4px;
}
.linoactive a {
    color: #0366d6;
}
.liactive a {
    color: #5ff382;
}
.isFixed {
    position: fixed;
    top: 0;
}
.home-body-middle {
    margin-left: 20%;
    height: 100%;
    width: 60%;
    min-height: 100vh;
}
.middle-box {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    margin-top: 5%;
}
.middle-box-loading {
    width: 100%;
    background: #fff;
    text-align: center;
}
.middle-box-loading img {
    width: 10%;
    margin: 1rem;
    animation: App-logo infinite 2s linear;
    /* infinite 动画循环无数次 linear 全程匀速 */
}
.suspensionbtn {
    text-align: right;
    margin-right: 5%;
}
@keyframes App-logo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-moz-keyframes App-logo {  /* Firefox */
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes App-logo {  /* Safari and Chrome */
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes App-logo {  /* Opera */
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.middleTitle {
    width: 100%;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
}
.middleTitleTop {
    width: 90%;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
}
.middle-user-avater {
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right: 0.5rem;
    background: rgb(250, 121, 121);
    border-radius: 5px;
}
.middleTitleright {
    margin-top: 0.5rem;
    width: 100%;
}
.middleTitlerightTop {
    
}
.middleTitlerightMiddle {
    background-color: #fff;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    line-height: 100%;
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
}
.middleTitlerightMiddleTop {
    display: flex;
    display: -webkit-flex;
    background: #fff;
    flex-direction: row;
    justify-content: space-between;
}
.middleTitlerightMiddleBottom {
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
}
.middleTitlerightMiddleBottom div {
    margin-left: 1rem;
}
.middleTitlerightMiddleBottom a {
    text-decoration: none;
    color: black;
    font-weight: 400;
    margin-left: 8px;
}
.circular {
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
}
.titleLeft {
    max-width: 70%;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-bottom: 1rem;
}
.starClick {
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.starClick button {
    height: 30px;
    font-size: 0.8rem;
    background-color: #eff3f6;
    color: #24292e;
    font-weight: 500;
    border: 1px solid #bbc2ca;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    display: flex;
    display: -webkit-flex;
    align-items: center;
}
.starClick button:hover {
    background-color: #e7ebec;
    border: 1px solid #82878d;
}
.starClick button:active {
    box-shadow: 1px 1px 1px #999ea3 inset;
}
.middlecontentDivide {
    margin: 0 auto;
    width: 90%;
    height: 1px;
    border-top: solid #d1d5da 1px;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: block;
}
.middlefooter {
    width: 100%;
    color: black;
    text-align: center;
    margin: 0 auto;
    height: 2rem;
}
.middlefooter a {
    color: black;
    text-decoration: none;
    margin-left:5px; 
}
.home-body-right {
    height: 100%;
    width: 20%;
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
/* @media (min-width: 1013px){

} */
@media (max-width: 1012px){
    header {
        padding: 1rem 2rem;
    }
    .home-body-left {
        width: 30%;
    }
    .home-body-middle {
        margin-left: 30%;
        width: 70%;
    }
    .home-body-right {
        display: none;
    }
}
@media (max-width: 768px){
    .home-body {
        flex-direction: column;
    }
    .home-body-left {
        width: 100%;
        position: relative;
        min-height: 0;
        background-color: #f6f8fa;
    }
    .classificationADD button {
        width: 23%;
    }
    .classificationADDonclick button {
        width: 23%;
    }
    .home-body-left .left-box {
        width: 90%;
        border: 1px solid #d1d5da;
        border-radius: 3px;
    }
    .left-box-end {
        width: 100%;
        text-align: center;
        margin-bottom: 1%;
    }
    .home-body-middle {
        width: 100%;
        margin-left: 0;
        min-height: 0;
    }
    .home-body-middle .middle-box {
        width: 90%;
    }
}
</style>
