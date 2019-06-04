<template>
    <div class="mask" @click="cancel" >
        <div class="confirmationmessage" :style="animation" v-show="isShowMessageBox">
            <div class="content">
                <div class="title">
                    <p>{{title}}</p>
                    <button class="close">X</button>
                </div>
                <div class="msg">
                    <p>{{msg}}</p>
                    <input :type="type" maxlength="18">
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
            // title: '提示',
            // msg: '将会删除该分类以及分类下所有分享',
            // type: 'password',
            animation: '',
            // isShowMessageBox: false
        }
    },
    props: {
        title: {
            type: String,
            default: '提示'
        },
        msg: {
            type: String,
            default: '请输入内容'
        },
        type: {
            type: String,
            default: 'text'
        },
        isShowMessageBox: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        cancel(ev){
            const classname = ev.target.className
            if(classname === 'mask' || classname === 'close' || classname === 'no' || classname === 'yes') {
                // this.$emit('confirmationmessageCancel',classname)
                console.log(classname)
                if(classname === 'mask') {
                    this.isShowMessageBox = true
                    setTimeout(()=>{
                        this.$nextTick(()=> {
                            this.animation = 'visibility: visible;top: 30%;transition: all 0.3s linear;opacity: 1;'
                        })
                    },0)  
                }else if(classname === 'close' || classname === 'no' || classname === 'yes') {
                    this.animation = 'visibility: visible;top: 25%;transition: all 0.15s linear;opacity: 0;'
                    setTimeout(()=>{
                        this.$nextTick(()=> {
                            this.isShowMessageBox = false
                        })
                    },150) 
                }
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
        // opacity: 0;
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
                flex-direction: column;
                line-height: 16px;
                input {
                    width: 100%;
                    height: 25px;
                    line-height: 25px;
                    border-radius: 5px;
                    font-size: 14px;
                    text-indent: 6px;
                    border: 1px solid #dcdfe6;
                    outline: none;
                    margin-top: 5px;
                }
            }
            .decision {
                text-align: right;
                button:nth-of-type(1) {
                    margin-right: 10px;
                    background: #fff;
                    border: 1px solid #dcdfe6;
                    color: #606266;
                    @include button;
                    &:hover {
                        color:#409eff;
                        border: 1px solid #c6e2ff;
                        background-color:#ecf5ff;
                        transition: .2s;
                    }
                }
                button:nth-of-type(2) {
                    color: #fff;
                    background-color: #409eff;
                    border: 1px solid #409eff;
                    @include button;
                    &:hover {
                        background-color: #66b1ff;
                        border: 1px solid #66b1ff;
                        color:#fff;
                        transition: .2s;
                    }
                }
            }
        }
    }   
}

</style>