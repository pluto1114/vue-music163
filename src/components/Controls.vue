<template>
	<transition name="slide-fade">
	<div v-show="show" class="controls">
	     <audio id="media" :src="song.mp3Url" @timeupdate="handleTimeUpdate" @canplay="handleCanPlay" controls></audio>
       <!-- <div class="audioplayer">
            <audio preload="auto" controls="" style="width: 0px; height: 0px; visibility: hidden;">
                <source src="audio/song.mp3">
                <source src="audio/song.ogg">
            </audio>
            <div class="audioplayer-playpause" title="Play"><a href="#">Play</a></div>
            <div class="audioplayer-time audioplayer-time-current">00:00</div>
            <div class="audioplayer-bar">
                <div class="audioplayer-bar-loaded" style="width: 100%;"></div>
                <div class="audioplayer-bar-played"></div>
            </div>
            <div class="audioplayer-time audioplayer-time-duration">{{duration}}</div>
            <div class="audioplayer-volume">
                <div class="audioplayer-volume-button" title="Volume"><a href="#">Volume</a></div>
                <div class="audioplayer-volume-adjust">
                    <div>
                        <div style="height: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>  -->
	</div>
	</transition>
</template>

<script>
import '../assets/css/audioplayer.css';
import { mapState } from 'vuex';
import { Toast } from 'mint-ui';
import _ from 'lodash';

export default {
  name: 'controls',
  data () {
    return {
    	show:false,
      lrcCurIndex:0,
      lrcLastIndex:0,
      duration:0
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
        this.duration=media.duration;
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
