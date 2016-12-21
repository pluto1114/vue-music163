<template>
	<transition name="slide-fade">
	<div v-show="show" class="controls">
	     <audio id="media" :src="song.mp3Url" @timeupdate="handleTimeUpdate" @canplay="handleCanPlay" controls></audio> 
	</div>
	</transition>
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'mint-ui';
import _ from 'lodash';

export default {
  name: 'controls',
  data () {
    return {
    	show:false,
      lrcCurIndex:0,
      lrcLastIndex:0
    }
  },
  computed:mapState({
    song:state=>state.song || {mp3Url:''},
    canPlay:state=>state.canPlay,
    lyricArr:state=>state.lyricArr,
    lrcTimeArr:state=>state.lrcTimeArr
  }),
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
          console.log("duration", media.duration)
          media.play();
        },1);
  		}
  	});
   
  	this.$root.$on('pause',()=>{
      media.pause();     
    });
  },
  methods:{
    handleTimeUpdate(){
      let curIndex=_.sortedIndex(this.lrcTimeArr, media.currentTime);
      if (this.lrcLastIndex == curIndex) {
          return;
      }
      this.lrcCurIndex = curIndex;
      this.color();
      if (this.lrcLastIndex > curIndex) {
          console.log('played');
          for (var i = curIndex; i <= this.lrcLastIndex; i++) {
              if(this.lyricArr[i])
                  this.lyricArr[i].show = true;
          }
      }
      this.disappear();
      this.lrcLastIndex = curIndex;
    },
    handleCanPlay(){
      this.$store.commit("changeCanPlay",true);
    },
    color() {
        for (var i = 0; i < this.lyricArr.length; i++) {
            this.lyricArr[i].selected = false;
        }
        if (this.lrcCurIndex > 0) {
            this.lyricArr[this.lrcCurIndex - 1].selected = true;
        }
    },
    disappear() {
        if (this.lrcCurIndex >= 2) {
            // for (var i = 2; i < this.lrcCurIndex; i++) {
            //     this.lyricArr[i - 2].show = false;
            // }
            this.$store.commit("changeLrcMarginTop",this.lrcCurIndex*(-2)+4.25);
        }
    },
    
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
