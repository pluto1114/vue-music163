<template>
	<transition name="slide-fade">
	<div id="lyric" class="lyric">	
    <ul :style="{marginTop:lrcMarginTop+'em'}">
			<li v-for="x of lrcArr" :key="x.time" :class="x.selected?selectedColor:defaultColor" v-show="x.show">{{x.lrc}}</li>
    </ul>  
	
		
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
    lrcArr: state=>state.lyricArr,
    lrcMarginTop:state=>state.lrcMarginTop
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

	height:8em;
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

ul {
  /*transition: transform 1s;*/
  transition: all 1s;
}

</style>
