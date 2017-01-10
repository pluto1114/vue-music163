<template>
	<transition name="slide-fade">
	<div class="song f1 container-flex box-ver">	
		<div  v-if="song" class="card f1">
			<div class="song-pic" :class="{rotating:playing}" :style="{backgroundImage:'url('+song.album.picUrl+')'}">
			</div>
		
			<div class="song-info">
				<h4>{{song.name}}</h4>
				<div style="font-size:0.9em;">{{song.artists[0].name}}</div>
			</div>
				<!-- <div class="t-gra">所属专辑：<span class="t-blu">{{song.album.name}}</span></div> -->
						
			<div class="btn-controls container-flex">
				<div class="btn-con" @click="handlePlay">
	          		<i class="fa fa-2x" :class="played" style="color:#d5d7dd;"></i>
	      		</div>
	      		
	      	</div>
	      	<Lyric :id="id"></Lyric>
	      	<!-- <audio id="media" :src="song.mp3Url" controls></audio>  -->
	      	<controls class="my-controls"></controls>
		</div>

	</div>
	</transition>
</template>

<script>
import '../assets/css/font-awesome.min.css';
import { Indicator } from 'mint-ui';
import Lyric from '../components/Lyric';
import Controls from '../components/Controls';
import { mapState } from 'vuex';
export default {
  name: 'song',
  data () {
    return {
      id:(this.$route.params.id || '307525'),
      show:false,
      
    }
  },
  computed:{
  	...mapState(['song','playing']),
  	played(){
  		return {'fa-play':!this.playing,'fa-stop':this.playing};
  	}
  },
  created(){
  	Indicator.open('加载中...');
	this.$store.commit("hideWelcome");
   
  	this.$store.dispatch("FETCH_SONG",this.id).then(()=>{
	    Indicator.close();
	    this.show=true;
	}); 
  	
  },
  methods:{
  	handlePlay(){
  		if(!this.playing){
	  		this.$root.$emit("play");
	  		
	  	}else{
	  		this.$root.$emit("pause");
	  		
	  	}
  	}
  },
  components:{Lyric,Controls}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song{
	padding-top: 0.2em;
	perspective: 1000px;
}
.song-pic{
	width:8em;
	height:8em;
	margin: 0 auto;

	background-repeat:no-repeat;
   	background-size:contain;
	background-position: center;
	border-radius: 50%;
	
}
.song-info{
	text-align: center;
}
.card{
	transform-style: preserve-3d;
}

.btn-controls{
	text-align: center;
}
.btn-con{
	margin: 0.5em auto;
	background-color: #2c3e50;
	padding: 0.5em 0.8em;
	border-radius: 50%;
	opacity: 0.6;
}
.t-gra{
	color: #999;
}
.t-blu{
	color:#22c;
}
.rotating{
	animation: rotate 30s linear 0s infinite normal both running;
}
.my-controls{
  width: 95%;
  position: absolute;
  left: 0;
  bottom: 0.1em;
  padding:0 .8em;
}

@keyframes rotate
{
from {transform:rotateY(0deg);}
to {transform:rotateY(360deg);}
}

@-webkit-keyframes rotate /*Safari and Chrome*/
{
from {transform:rotateY(0deg);}
to {transform:rotateY(360deg);}
}
</style>
