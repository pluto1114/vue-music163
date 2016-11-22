<template>
	<transition name="slide-fade">
	<div class="song">
	  	<div v-if="song" class="song-pic" :style="{backgroundImage:'url('+song.album.picUrl+')'}">
		</div>
		
		<div  v-if="show" class="card ">
			<h3>{{song.name}}</h3>
			<div class="t-gra">歌手：<span class="t-blu">{{song.artists[0].name}}</span></div>
			<div class="t-gra">所属专辑：<span class="t-blu">{{song.album.name}}</span></div>
			<div class="btn-controls">
				<div class="btn-con" @click="handlePlay">
	          		<mt-button type="primary">播放</mt-button>
	      		</div>
	      		<div class="btn-con" @click="handlePause">
	          		<mt-button type="primary">暂停</mt-button>
	      		</div>
	      	</div>
	      	<audio id="media" :src="song.mp3Url" controls></audio> 
		</div>
		
	</div>
	</transition>
</template>

<script>
import { Indicator } from 'mint-ui';

export default {
  name: 'song',
  data () {
    return {
      id:(this.$route.params.id || '307525'),
      show:false,
      song:null
    }
  },
  created(){
  	Indicator.open('加载中...');
  	this.$showSong({music_id:this.id},data=>{
  		console.log(data);	
  		this.song=data.songs[0];
  		Indicator.close();
  		this.show=true;
  	})
  },
  methods:{
  	handlePlay(){
  		document.getElementById("media").play();
  	},
  	handlePause(){
  		document.getElementById("media").pause();
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song{
	
}
.song-pic{
	
	min-height:15em;
	max-height:35em;
	margin:0.6em 0.875em;
	text-align: center;
	background-repeat:no-repeat;
   	background-size:contain;
	background-position: center;
}
.card{
	box-shadow:inset 0 0 10px #269;  
	margin:0 1em;
	height:15em;
	padding: 0.625em 1.2em;
	line-height: 1.5em;
}
.btn-controls{
	padding: 1em 0 2em 0;
	display: flex;
}
.btn-con{
	margin-right: 0.825em;
}
.t-gra{
	color: #999;
}
.t-blu{
	color:#22c;
}
</style>
