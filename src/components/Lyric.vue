<template>
	<transition name="slide-fade">
	<div id="lyric" class="lyric">	
		<transition-group name="lyric" tag="ul">
			<li v-for="x of lrcArr" :key="x.time" :class="x.selected?selectedColor:defaultColor" v-show="x.show">{{x.lrc}}</li>
		</transition-group>
		
	</div>
	</transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'lyric',
  props:['id'],
  data () {
    return {
      show:false,
      curIndex:0,
      defaultColor:'t-gra',
      selectedColor:'t-blu'
    }
  },
  computed:mapState({
    lrcArr: state=>state.lyricArr
  }),
  mounted(){ 
    this.$store.dispatch("FETCH_LYRIC",this.id).then(()=>{
      this.show=true;
    }); 
  },
  methods:{
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lyric{
	margin-top: 1em;
	height:13.5em;
	overflow-x:hidden; 
	overflow-y: scroll;
}
.lyric li{
	list-style: none;
	line-height: 2em;
	transition:0.25s ease;
}
.t-gra{
	color: #999;
}
.t-blu{
	color:#22c;
	
}

.lyric-enter-active, .lyric-leave-active {
  /*transition: transform 1s;*/
  transition: all 2s;
}
.lyric-leave-active {
  /*opacity: 0.5;*/
  transform: scaleY(0);
  height:0;
}
</style>
