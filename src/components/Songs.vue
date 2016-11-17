<template>
  <div class="songs">
  	<mt-cell :title="x.name" :label="x.album.name" is-link v-for="x in songs"></mt-cell>
    {{msg}}{{ $route.params.id }}
  </div>
</template>

<script>
export default {
  name: 'songs',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      songs:[]
    }
  },
  mounted(){
  	this.$searchSong({s:'汪峰'},function(data){
      this.songs=data.result.songs;
    }.bind(this));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
