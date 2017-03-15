<template>
  <div class="songs animation-style-1">
  	
  	<!-- <transition-group name="slide-fade"> -->
  	<mt-cell v-if="show" class="item" :title="x.name" :label="x.artists[0].name" is-link :to="'/song/'+x.id" v-for="x of songs" :key="x.id">
  		<span class="descp">Album {{x.album.name}}</span>
  	</mt-cell>
    
	<!-- </transition-group> -->
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
    this.$store.commit("hideWelcome");
    this.$store.commit("changePlaying",false);
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
<style lang="scss" rel="stylesheet/scss" scoped>
.songs .mint-cell{
  
}
.descp{
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  max-width:10em;
}
.error {
  color: red;
}
.animation-style-1 > .item {
    @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
            opacity: 0;
            animation-name: animationStyle1;
            animation-duration: 300ms * $i;
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;
        }
    }
}
@keyframes animationStyle1 {
    0% {
        opacity: 0;
        transform: rotateY(-90deg) translate3d(0, 30px, 0);
    }
    100% {
        opacity: 1;
        transform: rotate(0deg) translate3d(0, 0, 0);
    }
}
</style>
