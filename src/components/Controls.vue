<template>
	<transition name="slide-fade">
	<div v-show="show" class="controls">
	     <audio id="media" :src="mp3Url" controls></audio> 
	</div>
	</transition>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'controls',
  data () {
    return {
    	show:false,
      mp3Url:''
    }
  },
  computed:{
    lrcTimeArr(){
      return this.$store.state.lrcTimeArr;
    }
  },
  mounted(){
  	var media=document.getElementById("media");

  	this.$root.$on('play',(mp3Url)=>{
  		this.show=true;				
  		
      if(this.mp3Url!=mp3Url){
        this.mp3Url=mp3Url;
      }
    
      setTimeout(()=>{
        media.play();
      },1);
  		
  	});
   
  	this.$root.$on('pause',()=>{
      media.pause();     
    });
   
    
    media.addEventListener("pause",(e)=>{
      
    });
    media.addEventListener("play",(e)=>{
      
    });
    media.addEventListener("timeupdate",(e)=>{
      //console.log("timeupdate:"+media.currentTime)
      let curIndex=_.sortedIndex(this.lrcTimeArr, media.currentTime);
      this.$store.dispatch("TIME_UPDATE",curIndex);
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
