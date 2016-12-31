<template>
  <div class="songs">
  	
  	<transition-group name="slide-fade">
  	<mt-cell v-if="show" :title="x.name" :label="x.artists[0].name" is-link :to="'/song/'+x.id" v-for="x of songs" :key="x.id">
  		<span>专辑《{{x.album.name}}》</span>
  	</mt-cell>
    
	</transition-group>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { mapState } from 'vuex';
export default {
  name: 'songs',
  data:function(){
    return {show:false};
  },
  computed:mapState(['songs']),
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
      this.$store.dispatch("FETCH_SONG_LIST",{s:word}).then(()=>{
        Indicator.close();
        this.show=true;
      }); 
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.songs .mint-cell{
  background-color: transparent;
}
.error {
  color: red;
}

</style>
