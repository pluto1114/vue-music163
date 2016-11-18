<template>
  <div class="songs">
  	<div class="loading" v-if="loading">Loading...</div>
  	<transition-group name="slide">
  	<mt-cell v-if="songs" :title="x.name" :label="x.artists[0].name" is-link :to="'/song/'+x.id" v-for="x in songs" :key="x.id" class="content">
  		<span>来自专辑《{{x.album.name}}》</span>
  	</mt-cell>
    
	</transition-group>
  </div>abc:{{ $route.params.word }}
</template>

<script>
export default {
  name: 'songs',
  data () {
    return {
      loading: true,
      songs:null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods:{
  	fetchData(){
		let word=this.$route.params.word || '汪峰';
	  	console.log(word)
	  	this.$searchSong({s:word},data=>{
	      this.songs=data.result.songs;
	      this.loading=false;
	    });
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  position: absolute;
  top: 10px;
  right: 10px;
}
.error {
  color: red;
}
.content {
  transition: all .35s ease;
}
.slide-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-leave-active {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
