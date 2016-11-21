<template>
  <div id="app">
    <div style="display:flex;">
      <div style="flex:1;">
        <mt-field v-model="value" placeholder="输入歌曲名称或歌手姓名"></mt-field>
      </div>
      <div style="margin-left:20px;" @click="handleClick">
          <mt-button type="primary">搜索</mt-button>
      </div>
    </div>
    
    
    <router-view class="view"></router-view>
    
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  data:function(){
    
    return {value:'',result:[]}
  },
  components: {
    Hello
  },
  methods:{
    handleClick(){
      console.log("click:"+this.value)
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

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}
</style>
