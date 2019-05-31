<template>
    <div class="external-headpromptleftbox" :style="promptbox">
        <div class="headpromptleftbox" :class="{headpromptdisplayleftbox:headpromptIsDisplayleftbox,headpromptsucessleftbox:headPromptsucessleftbox}">
            <span>{{headpromptMsgleftbox}}</span>
            <button @click="closeHeadpromptleftbox">X</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // promptbox: 'z-index:-10',
            // headpromptIsDisplayleftbox: false,
            // headPromptsucessleftbox: false,
            // headpromptMsgleftbox: '',
        }
    },
    props: {
        promptbox: String,
        headpromptIsDisplayleftbox: Boolean,
        headPromptsucessleftbox: Boolean,
        headpromptMsgleftbox: String
    },
    methods: {
        closeHeadpromptleftbox() {
            this.$emit('closeHeadpromptleftbox');
        },
    }
}
</script>

<style scoped>
.external-headpromptleftbox {
  position: absolute;
  width: 100%;
  height: 40px;
  top: 10%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  overflow: hidden;
  z-index: 1000;
}
.headpromptleftbox {
  padding-left: 10px; 
  box-sizing: border-box;
  position: absolute;
  height: 40px;
  background-color: #ffdce0;
  color: #86181d;
  font-size: 0.8rem;
  line-height: 40px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #ffdce0;
  overflow: hidden;
  transform: translateY(-100%);
}
.headpromptleftbox button {
  /* margin-left: 7%; */
  outline: none;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
  border: none;
  color: #86181da6
}
.headpromptleftbox button:hover {
  color: #86181d;
}
.headpromptsucessleftbox {
  padding-left: 10px; 
  box-sizing: border-box;
  position: absolute;
  height: 40px;
  background-color: #cbf7ae;
  color: #16ad3c;
  font-size: 0.8rem;
  line-height: 40px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #d0f7b6;
  overflow: hidden;
  transform: translateY(-100%);
}
.headpromptsucessleftbox button {
  /* margin-left: 7%; */
  outline: none;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
  border: none;
  color: #16ad3cb0;
}
.headpromptsucessleftbox button:hover {
  color: #16ad3c;
}
.headpromptdisplayleftbox {
  transform: translateY(0);
  transition: transform 0.6s;
}
</style>

