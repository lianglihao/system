<template>
    <div class="aboutauthor">
        邮箱：807478609@qq.com 
        <h1>欢迎提出反馈</h1>
        <button @click="test">test</button>
    </div>
</template>

<script>
export default {
    name: 'aboutauthor',
    components: {

    },
    data() { 
        return {
            
        }
    },
    methods: {
        test () {
            this.$messageJk({
                msg: '密码错误',
                type: 'success'
            })
            // this.$msgBox({
            //     title: '添加分类',
            //     content: '请填写分类名称',
            //     isShowInput: true,
            //     placeholder: '请输入'
            // }).then(async (val) => {
            //     console.log(val)       
            // }).catch((val) => {
            //     console.log(val)       
            // });
        }
    }
}
</script>

<style scoped>

</style>
