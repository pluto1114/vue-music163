<template>
	<transition name="slide-fade">
	<div class="lyric">	
		<ul v-show="show">
			<li v-for="x of lrcArr">{{x.lrc}}</li>
		</ul>
		
	</div>
	</transition>
</template>

<script>

export default {
  name: 'lyric',
  props:['id'],
  data () {
    return {
      show:false,
      lrcArr:[],
    }
  },
  mounted(){

  	this.$showLyric({music_id:this.id},data=>{
      this.show=true;
      let arr=data.lrc.lyric.split('\n');
      for(const item of arr){
        //console.log(item)
        let lrcObj={};
        let timeStr=item.match("\\[(.+?)\\]")[1];
        let timeArr=timeStr.split(":");
        let time=parseInt(timeArr[0])*60+parseInt(timeArr[1]);
        lrcObj.time=time;
        lrcObj.lrc=item.replace(new RegExp(/(\.\d{2,3})/g),'');
        this.lrcArr.push(lrcObj);
      }
     		
  	});
    this.$root.$on("tick",cur=>{
      console.log(cur);

    })
  },
  methods:{
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lyric{
	margin-top: 1em;
	height:13.5em;
	overflow-x:hidden; 
	overflow-y: scroll;

}
.lyric li{
	list-style: none;
	line-height: 2em;
}
.t-gra{
	color: #999;
}
.t-blu{
	color:#22c;
}
</style>
