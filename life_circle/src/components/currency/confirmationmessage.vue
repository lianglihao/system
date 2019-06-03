<template>
    <div class="mask" @click="cancel">
        <div class="confirmationmessage confirmationmessagecl" :style="confirmationmessagecl">
            <div class="content">
                <div class="title">
                    <p>提示</p>
                    <button class="close">X</button>
                </div>
                <div class="msg">
                    <img src="../../assets/confirmationmessage/worning.png">
                    <P>是否删除该分类，该操作将删除所有此类分享</P>
                </div>
                <div class="decision">
                    <button class="no">取消</button>
                    <button class="yes">确定</button>
                </div>
            </div>
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
    },
    methods: {
        cancel(ev){
            const classname = ev.target.className
            if(classname === 'mask' || classname === 'close' || classname === 'no' || classname === 'yes') {
                this.$emit('confirmationmessageCancel',classname)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$pb: 10px;
@mixin button {
    font-size: 12px;
    cursor: pointer;
    border-radius: 5px;
    height: 28px;
    width: 50px;
    outline: none;
}
.mask {
    position: absolute;
    background: rgba(0,0,0,0.3);
    /* 父亲div用rgba，那么子div就不会随着父div变透明 */
    z-index: 9000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    .confirmationmessage {
        position: absolute;
        width: 420px;
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
        @media (max-width: 768px){
            width: 80%;
            left: 0%;
            top: 0%;
            margin-left: 10%;
        }
        .content {
            width: 90%;
            height: 90%;
            margin: 2.5% auto;
            display: flex;
            flex-direction: column;
            font-size: 16px;
            .title {
                padding-bottom: $pb;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
                button {
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #606266;
                    cursor: pointer;
                    &:hover {
                        color: #00B4FF;
                    }
                }
            }
            .msg {
                padding-bottom: $pb;
                color: #606266;
                font-size: 12px;
                display: flex;
                line-height: 16px;
                img {
                    width: 16px;
                    height: 16px;
                    margin-right: 10px;
                }
            }
            .decision {
                text-align: right;
                button:nth-of-type(1) {
                    margin-right: 10px;
                    background: #fff;
                    border: 1px solid #dcdfe6;
                    @include button;
                    &:hover {
                        background: #87CEFA;
                        border: #87CEFA;
                        color: #3399cc;    
                        transition: .2s;
                    }
                }
                button:nth-of-type(2) {
                    background: #00B4FF;
                    color: white;
                    border: 1px solid #00B4FF;
                    @include button;
                    &:hover {
                        background: #84d7f9;
                        border: #84d7f9;  
                        transition: .2s;
                    }
                }
            }
        }
    }   
    .confirmationmessagecl {
        visibility: hidden;top: 25%;transition: all 0.15s linear;opacity: 0;
    }
}

</style>
