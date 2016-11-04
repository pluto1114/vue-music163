<template>
  <div id="app">
    <mt-header fixed title="固定在顶部"></mt-header>
    <div class="logo">
    <mt-search
      v-model="value"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>
  </div>
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
    return {value:'mk'}
  },
  components: {
    Hello
  },
  methods:{
    handleClick:function(){
      console.log(9)
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
