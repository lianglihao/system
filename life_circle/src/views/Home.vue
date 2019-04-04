<template>
  <div class="home">
    <div class="content"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  }
}
</script>

<style scoped>
.home {

}
.content {
  background-image: url(../assets/ALT2.jpg);
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  /* min-width: 1000px; */
  z-index:-10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
</style>
