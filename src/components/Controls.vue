<template>
	<transition name="slide-fade">
	<div v-show="show" class="controls">
	     <!-- <audio id="media" :src="song.mp3Url" @timeupdate="handleTimeUpdate" @canplay="handleCanPlay" controls></audio> -->
       <div class="audioplayer">
            <audio id="media" :src="song.mp3Url" style="width: 0px; height: 0px; visibility: hidden;" @timeupdate="handleTimeUpdate">
                <!-- <source :src="song.mp3Url"> -->
            </audio>
            <div class="audioplayer-playpause" title="Play" @click=""><a href="#">Play</a></div>
            <div class="audioplayer-time audioplayer-time-current">{{currentTimeStr}}</div>
            <div id="bar" class="audioplayer-bar">
                <div class="audioplayer-bar-loaded" :style="{width: loadedPercent+'%'}" @click="changePos($event)"></div>
                <div class="audioplayer-bar-played" :style="{width: playedPercent+'%'}" @click="changePos($event)"></div>

            </div>
            <div class="audioplayer-time audioplayer-time-duration">{{durationStr}}</div>
            <div class="audioplayer-volume">
                <div class="audioplayer-volume-button" title="Volume"><a onclick="return false;">Volume</a></div>
                <div class="audioplayer-volume-adjust">
                    <div id="volumeOuterBar" @click="changeVolume($event,1)">
                        <div id="volumeBar" :style="{height: volume+'px'}"></div>
                    </div>
                </div>
            </div>
        </div> 
	</div>
	</transition>
</template>

<script>
import '../assets/css/audioplayer.css';
import { mapState } from 'vuex';
import { Toast } from 'mint-ui';
import _ from 'lodash';
var media;
export default {
  name: 'controls',
  data () {
    return {
    	show:false,
      lrcCurIndex:0,
      lrcLastIndex:0,
      currentTime:0,
      duration:1,
      loadedPercent:0,
      volume:100
    }
  },
  computed:{
    ...mapState({
      song:state=>state.song || {mp3Url:''},
      lyricArr:state=>state.lyricArr,
      lrcTimeArr:state=>state.lrcTimeArr
    }),
    currentTimeStr(){
      return this.convertToTime(this.currentTime);
    },
    durationStr(){
      return this.convertToTime(this.duration);
    },
    playedPercent(){
      return (this.currentTime/this.duration)*100;
    }
  },
  created(){
    
  },
  mounted(){
    console.log('song',this.song)
    media=document.getElementById("media");
    media.addEventListener("loadeddata",(e)=>{
      var interval = setInterval(()=>{
          if( media.buffered.length < 1 ) return true;
          this.loadedPercent= ( media.buffered.end( 0 ) / media.duration ) * 100;
          if( Math.floor( media.buffered.end( 0 ) ) >= Math.floor( media.duration ) ) clearInterval( interval );
      }, 100 );
    });
    media.addEventListener("ended",()=>{
      media.currentTime=0;
      this.$store.commit("changePlaying",false);
    });
  	this.$root.$on('play',()=>{
	
      
      this.show=true;
      this.$store.commit("changePlaying",true);
      setTimeout(()=>{
        console.log("duration", media.duration)
        media.play();
      },10);
  		
  	});
   
  	this.$root.$on('pause',()=>{
      media.pause();   
      this.$store.commit("changePlaying",false);  
    });
  },
  methods:{
    handleTimeUpdate(){
      if(this.duration!=0){
        this.duration=media.duration;
      }
      // console.log(this.durationStr)
      this.currentTime=media.currentTime;
      let curIndex=_.sortedIndex(this.lrcTimeArr, media.currentTime);
      if (this.lrcLastIndex == curIndex) {
          return;
      }
      this.lrcCurIndex = curIndex;
      this.color();
      
      this.disappear();
      this.lrcLastIndex = curIndex;
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
            this.$store.commit("changeLrcMarginTop",this.lrcCurIndex*(-2)+4.25);
        }
    },
    changePos(e){
      console.log(e);
      let x=e.offsetX;
      console.log("x", x);
      console.log("totalWidth",document.getElementById("bar").offsetWidth);
      let percent=x/document.getElementById("bar").offsetWidth;
      console.log(percent)
      media.currentTime=this.duration*percent;
    },
    changeVolume(e,isOuter){
      let y=e.pageY;
      let totalWidth=document.getElementById("volumeOuterBar").offsetHeight;
      let offset=this.getOffset(document.getElementById("volumeOuterBar"));
      this.volume=Math.abs(y-(offset.top+totalWidth));
      media.volume=this.volume/100;
    },
    convertToTime(time){
      var min = Math.floor((time / 60) % 60);
      var sec = Math.floor(time % 60);
      var cTime;
      if(sec < 10) {
          sec = '0' + sec;
      }
      if(min<10){
        min='0'+min;
      }
      cTime = min + ':' + sec
      return cTime;
    },
    getOffset(Node, offset) {
        if (!offset) {
            offset = {};
            offset.top = 0;
            offset.left = 0;
        }
        if (Node == document.body) {//当该节点为body节点时，结束递归
            return offset;
        }
        offset.top += Node.offsetTop;
        offset.left += Node.offsetLeft;
        return this.getOffset(Node.parentNode, offset);//向上累加offset里的值
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controls{
	
}

</style>
