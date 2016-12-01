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
  mounted(){
  	var media=document.getElementById("media");
  	var pos=0;
  	this.$root.$on('play',(mp3Url)=>{
  		this.show=true;				
  		media.src=mp3Url;
  		if (pos>0 && localStorage.lastUrl==mp3Url) {
  			media.currentTime=pos;
  		}
  		localStorage.lastUrl=mp3Url;
  		media.play();
      setInterval(()=>{
        this.$root.$emit("tick",media.currentTime);
      }, 250);
  	});
  	this.$root.$on('pause',()=>{
  		media.pause();
  		pos=media.currentTime;
  		media.currentTime=0;
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
