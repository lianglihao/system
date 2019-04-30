<template>
    <div class="mask">
        <div class="confirmationmessage" :style="confirmationmessagecl">
        113
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        confirmationmessagecl: String
    }
}
</script>

<style scoped>
.mask {
    position: absolute;; 
    background: rgba(0,0,0,0.3);
    /* 父亲div用rgba，那么子div就不会随着父div变透明 */
    z-index: 9000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
}
.confirmationmessage {
    position: absolute;
    width: 420px;
    height: 200px;
    z-index: 1;
    left: 50%;
    top: 25%;
    margin-left: -210px;
    z-index:10;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    opacity: 0;
}
</style>
