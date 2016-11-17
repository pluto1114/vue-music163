<template>
  <div id="app">
    <div style="display:flex;">
      <div style="flex:1;">
        <mt-field placeholder="登录邮箱"></mt-field>
      </div>
      <div style="margin-left:20px;">
        <router-link to="/songs/我">
          <mt-button type="primary">primary</mt-button>
        </router-link>
      </div>
    </div>
    <mt-cell title="标题" label="描述信息" is-link></mt-cell>
    <ul>
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/foo">/foo</router-link></li>
      <li><router-link to="/bar">/bar</router-link></li>
    </ul>
    <router-view class="view"></router-view>
    
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  data:function(){
    this.$searchSong({s:'汪峰'},function(data){
      console.log(data)
    });
    return {value:'',result:[]}
  },
  components: {
    Hello
  },
  methods:{
    handleClick:function(){
      console.log(9)
    },
    handlerInput:function(val){
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
