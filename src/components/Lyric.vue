<template>
	<transition name="slide-fade">
	<div id="lyric" class="lyric">	
		<transition-group name="lyric" tag="ul">
			<li v-for="x of lrcArr" :key="x.time" :class="x.selected?selectedColor:defaultColor" v-show="x.show">{{x.lrc}}</li>
		</transition-group>
		
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
      
      this.lrcArr=convertLrcArr(arr);
      this.$root.$emit("loadedLyric",this.lrcArr);		
  	});  
    
    this.$root.$on("changedIndex",(curIndex,played)=>{
      let lastIndex=this.curIndex; 
      this.curIndex=curIndex;
      this.color();
      if(!played){
	    this.disappearLast();
	  }else{
	  	this.played(lastIndex);
	  }
      //this.scroll();
    });
    
    function convertLrcArr(arr){
      let lrcArr=[];
      let duration=0;
      console.log(arr.length)
      for(let i=0;i<arr.length-1;i++){
        let item=arr[i];
        let lrcObj={};
        let timeStr=item.match("\\[(.+?)\\]")[1];
     
     	//declude not time
        if(/[^0-9\.\:]/.test(timeStr)){   	
        	continue;
        }
        let timeArr=timeStr.split(":");
        let time=parseInt(timeArr[0])*60+parseFloat(timeArr[1]);

        lrcObj.selected=false;
        lrcObj.show=true;
       
        lrcObj.time=time;
        lrcObj.lrc=item.replace(new RegExp(/(\.\d{2,3})/g),'');
        lrcArr.push(lrcObj);
      }
      return lrcArr;
    }
  },
  methods:{
  	color(){
      	for (var i = 0;i<this.lrcArr.length;i++) {
        	this.lrcArr[i].selected=false;
      	}
      	this.lrcArr[this.curIndex-1].selected=true;
    },
    disappearLast(){
    	if (this.curIndex>=2) {
    		for(var i=2;i<this.curIndex;i++){
				this.lrcArr[i-2].show=false;
    		}
    	}
    },
    played(lastIndex){
    	for (var i = this.curIndex; i <=lastIndex; i++) {
    		this.lrcArr[i].show=true;
    	}
    	this.disappearLast();
    },
    scroll(){
    	var container=document.getElementById("lyric");
      	console.log('scrollTop:'+container.scrollTop)
      	var element = document.querySelector('.t-gra');
    
      	console.log(element.offsetHeight*this.curIndex-container.scrollTop)
      	if(element.offsetHeight*(this.curIndex*1.2)-container.scrollTop>element.offsetHeight*3){
        	container.scrollTop=element.offsetHeight*(this.curIndex*1.2);
      	}
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
	
}

.lyric-enter-active, .lyric-leave-active {
  /*transition: transform 1s;*/
  transition: all 2s;
}
.lyric-leave-active {
  /*opacity: 0.5;*/
  transform: scaleY(0);
  height:0;
}
</style>
