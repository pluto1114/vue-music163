<template>
	<transition name="slide-fade">
	<div class="song">	
		<div  v-if="song" class="card ">
			<div class="song-pic" :class="{rotating:playing}" :style="{backgroundImage:'url('+song.album.picUrl+')'}">
			</div>
			<div class="song-info">
				<h4>{{song.name}}</h4>
				<div style="font-size:0.9em;">{{song.artists[0].name}}</div>
			</div>
				<!-- <div class="t-gra">所属专辑：<span class="t-blu">{{song.album.name}}</span></div> -->
						
				<div class="btn-controls container-flex">
					<div class="btn-con" v-tap="{methods:handlePlay}">
		          		<i class="fa fa-2x" :class="played" style="color:#d5d7dd;"></i>
		      		</div>
		      		
		      	</div>
	      	<Lyric :id="id"></Lyric>
	      	<!-- <audio id="media" :src="song.mp3Url" controls></audio>  -->
		</div>

	</div>
	</transition>
</template>

<script>
import '../assets/css/font-awesome.min.css';
import { Indicator } from 'mint-ui';
import Lyric from '../components/Lyric';
import { mapState } from 'vuex';
export default {
  name: 'song',
  data () {
    return {
      id:(this.$route.params.id || '307525'),
      show:false,
      playing:false
    }
  },
  computed:{
  	...mapState(['song']),
  	played(){
  		return {'fa-play':!this.playing,'fa-stop':this.playing};
  	}
  },
  created(){
  	Indicator.open('加载中...');

  	this.$store.commit("changeCanPlay",false);
  	this.$store.dispatch("FETCH_SONG",this.id).then(()=>{
	    Indicator.close();
	    this.show=true;
	}); 
  	
  },
  methods:{
  	handlePlay(){
  		if(!this.playing){
	  		this.$root.$emit("play");
	  		this.playing=true;
	  	}else{
	  		this.$root.$emit("pause");
	  		this.playing=false;
	  	}
  	}
  },
  components:{Lyric}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song{
	padding-top: 1em;
	
}
.song-pic{
	width:15em;
	height:15em;
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

}
.btn-controls{
	text-align: center;
}
.btn-con{
	margin: 0.65em auto;
	background-color: #2c3e50;
	padding: 0.8em 1em;
	border-radius: 50%;
}
.t-gra{
	color: #999;
}
.t-blu{
	color:#22c;
}
.rotating{
	animation: rotate 60s linear 0s infinite normal both running;
}

@keyframes rotate
{
from {transform:rotate(0deg);}
to {transform:rotate(360deg);}
}

@-webkit-keyframes rotate /*Safari and Chrome*/
{
from {transform:rotate(0deg);}
to {transform:rotate(360deg);}
}
</style>
