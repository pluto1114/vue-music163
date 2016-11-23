<template>
  <div class="songs">
  	
  	<transition-group name="slide-fade">
  	<mt-cell v-if="show" :title="x.name" :label="x.artists[0].name" :to="'/song/'+x.id" v-for="x in songs" :key="x.id">
  		<span>专辑《{{x.album.name}}》</span>
  	</mt-cell>
    
	</transition-group>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
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
  		Indicator.open('加载中...');
		let word=this.$route.params.word || '汪峰';
	  	console.log(word)
	  	this.$searchSong({s:word},data=>{
	      this.songs=data.result.songs;
	      Indicator.close();
          this.show=true;
	    });
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.error {
  color: red;
}

</style>
