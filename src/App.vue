<template>
  <div id="app">
    
    <welcome :show="showWelcome" @afterLeave="toSongs"></welcome>
 
    <div class="container-flex">
      <div class="f1">
        <mt-field v-model="value" placeholder="输入歌曲名称或歌手姓名"></mt-field>
      </div>
      <div style="margin-left:20px;" v-tap="{methods:handleSearch}">
          <mt-button type="primary">搜索</mt-button>
      </div>
    </div>   
    <div class="my-badges">
      <transition-group name="list">
        <mt-badge type="primary" size="large" v-for="word of searchWordArr" :key="word">
          <span @click="handleWord(word)">{{word}}</span>
        </mt-badge>
    </transition-group>
    </div>
    <router-view class="view"></router-view>
    <controls class="my-controls"></controls>
    


    
  </div>
</template>

<script>
import Welcome from './components/Welcome'
import Controls from './components/Controls'
import { Toast } from 'mint-ui';
export default {
  name: 'app',
  data:function(){
    // init searchWordArr
    var searchWordArr=[];
    if (localStorage.searchWords) {
      searchWordArr=JSON.parse(localStorage.searchWords);
    }
    console.log("searchWordArr:"+searchWordArr);
    return {
      value:'',
      showWelcome:true,
      searchWordArr:searchWordArr
    }
  },
  components: {
    Welcome,
    Controls
  },
  methods:{
    handleSearch(){
      console.log("click:"+this.value);
      if (this.value=='') {
        Toast('搜索关键字不可为空');
        return;
      }
      if(!this.showWelcome){
        this.toSongs();
      }else{
        this.showWelcome=false;
      }
    },
    handleWord(word){
      this.value=word;
      this.handleSearch();
    },
    toSongs(){
      this.$router.push({ path: '/songs/'+this.value});

      //update searchWords
      if(this.searchWordArr.indexOf(this.value)<0){
        this.searchWordArr.unshift(this.value);
      }
      if(this.searchWordArr.length>5){
        this.searchWordArr=this.searchWordArr.slice(0,5);
      }
      
      localStorage.searchWords=JSON.stringify(this.searchWordArr);
      
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}
a{
  text-decoration:none; 
}
.container-flex{
  display: -webkit-box !important;
  display: box !important;
  position:relative;
  margin: 2px 4px;  
}
.f1{
  position:relative;
  box-flex: 1;
  -webkit-box-flex: 1; 
  

}
.my-badges{
  margin:0.4em 0 0.8em 0;
  overflow: hidden;
}
.mint-badge{
  margin:0.1em 0.2em;
}
.mint-cell-title{
  min-width: 6em;
}

.my-controls{
  width: 95%;
  position: fixed;
  left: 0;
  bottom: 1em;
  padding:0 .8em;
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}


.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

@media (min-width: 1024px) {
    #app {
        width:480px;
        min-height:800px;
        padding:10px;
        border:1px solid #ccc;
        border-radius: 0.3em;
        margin:0 auto;
    }
    .my-controls{
        
    }
}
</style>
