<template>
  <button class="suspension" :class="suspensionbtn"><slot></slot></button>
</template>

<script>
export default {
    name: 'suspension',
    data() {
        return {

        }
    },
    created() {
        
    },
    props: {
        suspensionbtn: String
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
@mixin suspension {
    width: 80px;
    height: 35px;
    color: white;
    border: none;
    cursor: pointer;
    outline: none;
    -webkit-transition: all 0.8s;
    transition: all 0.8s;
    margin-bottom: 5px;
    &:hover {
        -webkit-box-shadow: 5px 5px 5px grey;
        box-shadow: 5px 5px 5px grey;
    }
}
.suspension {
    @include suspension;
}
.delete {
    background-color: #f52e59;
}
.delete:hover {
    background-color: #f54d71;
}
.add {
    background-color: #0091eb;
}
.add:hover {
    background-color: #3aa6e9;
}
</style>
