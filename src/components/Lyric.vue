<template>
	<transition name="slide-fade">
	<div class="lyric" v-show="show">	
		<ul>
			<li v-for="x of lrcArr">{{x}}</li>
		</ul>
		
	</div>
	</transition>
</template>

<script>

export default {
  name: 'lyric',
  props:['id'],
  data () {
    return {
      show:false,
      lrcArr:null
    }
  },
  created(){
  	this.$showLyric({music_id:this.id},data=>{
  		this.lrcArr=data.lrc.lyric.replace(new RegExp(/(\.\d{2,3})/g),'').split('\n');
  		console.log(this.lrcArr)
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
}
.t-gra{
	color: #999;
}
.t-blu{
	color:#22c;
}
</style>
