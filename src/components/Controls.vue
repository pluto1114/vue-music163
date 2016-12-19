<template>
	<transition name="slide-fade">
	<div v-show="show" class="controls">
	     <audio id="media" :src="song.mp3Url" controls></audio> 
	</div>
	</transition>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'controls',
  data () {
    return {
    	show:false
    }
  },
  computed:{
    song(){
      return this.$store.state.song || {mp3Url:''};
    },
    canPlay(){
      return this.$store.state.canPlay;
    }
  },
  created(){
    this.$store.commit("changeCanPlay",false);
  },
  mounted(){
  	var media=document.getElementById("media");

  	this.$root.$on('play',()=>{
      console.log("canplay",this.canPlay);		
      if (!this.canPlay) {
        Toast("音乐加载失败，还是换一个试试吧");
      }else{
        this.show=true; 
        setTimeout(()=>{
          media.play();
        },1);
  		}
  	});
   
  	this.$root.$on('pause',()=>{
      media.pause();     
    });
   
    
   
    media.addEventListener("canplay",(e)=>{
      this.$store.commit("changeCanPlay",true);
      
      
    });
    media.addEventListener("timeupdate",(e)=>{
      //console.log("timeupdate:"+media.currentTime)
      this.$store.dispatch("TIME_UPDATE",media.currentTime);
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
