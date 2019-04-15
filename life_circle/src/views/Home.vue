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
            headimg: ''
        }
    },
    mounted() {
        this.uname = this.$refs.headerChild.uname;
        this.headimg = this.$refs.headerChild.headimg;
    } 
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
