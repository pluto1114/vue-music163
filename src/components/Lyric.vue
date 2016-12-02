<template>
	<transition name="slide-fade">
	<div class="lyric">	
		<ul v-show="show">
			<li v-for="x of lrcArr" :class="x.selected?selectedColor:defaultColor">{{x.lrc}}</li>
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
      curIndex:0,
      defaultColor:'t-gra',
      selectedColor:'t-blu'
    }
  },
  mounted(){

  	this.$showLyric({music_id:this.id},data=>{
      this.show=true;
      let arr=data.lrc.lyric.split('\n');
      let duration=0;
      for(let i=0;i<arr.length;i++){
      	let item=arr[i];
        // console.log(item)
        let lrcObj={};
        let timeStr=item.match("\\[(.+?)\\]")[1];
        let timeArr=timeStr.split(":");
        let time=parseInt(timeArr[0])*60+parseFloat(timeArr[1]);
		if(i>0){
        	let lastObj=this.lrcArr[i-1];
        	duration=Math.floor((time-lastObj.time)*1000);
        	//console.log(duration);
        }
        lrcObj.selected=false;
        lrcObj.duration=duration;
        lrcObj.time=time;      
        lrcObj.lrc=item.replace(new RegExp(/(\.\d{2,3})/g),'');
        this.lrcArr.push(lrcObj);
      }
      		
  	});  
    this.$root.$on("play",()=>{
       this.color();

    });



  },
  methods:{
  	color(){
    	if(this.curIndex>=this.lrcArr.length){
    		return;
    	}
    	setTimeout(()=>{
    		if (this.curIndex>0) {
    			this.lrcArr[this.curIndex-1].selected=false;
    		}
    		this.lrcArr[this.curIndex].selected=true;
    		this.curIndex++;
    		this.color();
    	},this.lrcArr[this.curIndex].duration);
    }
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
	transition:0.25s ease;
}
.t-gra{
	color: #999;
}
.t-blu{
	color:#22c;
	transform: scaleY(1.25);
}
</style>
