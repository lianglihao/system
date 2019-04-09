<template>
  <div class="personalhomepage">
    <div class="content">
        <h1>{{uname}}</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'PersonalHomepage',
  components: {
    
  },
  data() {
      return {
          uname: ''
      }
  },
  created() {
      var that = this;
      let uname = this.$route.params.uname;
      that.uname = uname;
  }
}
</script>

<style scoped>

</style>
