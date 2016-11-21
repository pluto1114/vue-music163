<template>
  <div class="songs">
  	<div class="loading" v-if="loading">Loading...</div>
  	<transition-group name="slide-fade">
  	<mt-cell v-if="show" :title="x.name" :label="x.artists[0].name" is-link :to="'/song/'+x.id" v-for="x in songs" :key="x.id">
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
      show: false,
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
        this.show=true;
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

</style>
