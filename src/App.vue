<template>
  <div id="app">
    
    <welcome :show="showWelcome" @afterLeave="toSongs"></welcome>
 
    <div style="display:flex;">
      <div style="flex:1;">
        <mt-field v-model="value" placeholder="输入歌曲名称或歌手姓名"></mt-field>
      </div>
      <div style="margin-left:20px;" @click="handleClick">
          <mt-button type="primary">搜索</mt-button>
      </div>
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
    return {
      value:'',
      showWelcome:true
    }
  },
  components: {
    Welcome,
    Controls
  },
  methods:{
    handleClick(){
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
    toSongs(){
      this.$router.push({ path: '/songs/'+this.value})
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

.mint-cell-title{
  padding-left:1.2em;
}
.my-controls{
  width: 95%;
  position: fixed;
  left: 0;
  bottom: 5px;
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
