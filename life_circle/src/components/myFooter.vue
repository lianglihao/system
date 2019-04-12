<template>
    <div class="myfooter">
            <p class="foo">&copy; 2018-2019 Lifr_Circle <a href="https://github.com/lianglihao" title="开发者github" target="_blank">开发者：LHJs</a>  <a href="http://www.miitbeian.gov.cn" title="工信部首页链接" target="_blank">浙ICP备18051718号-1</a></p>
    </div>
</template>

<script>
export default {
    name: 'myfooter',
}
</script>

<style scoped>
.myfooter {
    height: 2rem;
    width: 100%;
    color: #fff;
    text-align: center;
    position: fixed;
    bottom: 0;
    margin: 0 auto;
}
a {
    color: #fff;
    text-decoration: none;
    margin-left:5px; 
}
</style>
