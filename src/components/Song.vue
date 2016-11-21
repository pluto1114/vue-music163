<template>
  <div v-if="song" class="song">
  	<div class="song-pic" :style="{backgroundImage:'url('+song.album.picUrl+')'}">
	</div>
	<div class="card">
		<h3>{{song.name}}</h3>
		<div class="t-gra">歌手：<span class="t-blu">{{song.artists[0].name}}</span></div>
		<div class="t-gra">所属专辑：<span class="t-blu">{{song.album.name}}</span></div>
		<div class="btn-play" @click="handleClick">
          <mt-button type="primary">播 放</mt-button>
      	</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'song',
  data () {
    return {
      id:(this.$route.params.id || '307525'),
      song:null
    }
  },
  created(){
  	console.log("created")
  	this.$showSong({music_id:this.id},data=>{
  		console.log(data)
  		this.song=data.songs[0];
  	})
  },
  methods:{
  	handleClick:()=>{

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
	height:10em;
	padding: 0.625em 1.2em;
	line-height: 1.5em;
}
.btn-play{
	padding: 0.6em 0;
}
.t-gra{
	color: #999;
}
.t-blu{
	color:#22c;
}
</style>
