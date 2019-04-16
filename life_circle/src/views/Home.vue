<template>
    <div class="home">
        <header>
            <myheader ref="headerChild"></myheader>
        </header>
        <div>
            {{uname}}
            <img :src="headimg">
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
            uname: '',
            headimg: '',
            isLogin: localStorage.getItem('isLogin')
        }
    },
    mounted() {
        this.uname = this.$refs.headerChild.uname;
        this.headimg = this.$refs.headerChild.headimg;
        //获取myHeader组件内的uname（用户名）和headimg（用户头像）信息
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
</style>
