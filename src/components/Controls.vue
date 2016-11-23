<template>
	<transition name="slide-fade">
	<div v-show="show" class="controls">
	     <audio id="media" :src="mp3Url" controls></audio> 
	</div>
	</transition>
</template>

<script>

export default {
  name: 'controls',
  data () {
    return {
    	show:false,
      	mp3Url:''
    }
  },
  created(){
  	this.$root.$on('play',(mp3Url)=>{
  		this.show=true;
  		document.getElementById("media").src=mp3Url;
  		document.getElementById("media").play();
  	});
  	this.$root.$on('pause',()=>{
  		document.getElementById("media").pause();
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controls{
	
}
audio{
	width: 100%;
}
</style>
