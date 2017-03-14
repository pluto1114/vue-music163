<template>
  <transition name="slide-up" v-on:after-leave="afterLeave">
  <div v-show="show" class="welcome neonText">
    <h1>{{ msg }}</h1>
    <h2>Music163</h2>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'welcome',
  computed:{
    show(){
      return this.$store.state.showWelcome;
    }
  },
  data () {
    return {
      msg: 'Embrace Vue,enjoy life'
    }
  },
  methods:{
    afterLeave(){
      this.$emit("afterLeave");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome{
  text-align: center;
  height:15em;
  overflow: hidden;
  line-height: 2em;
}

h1 {
  color: #fff;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,0.1), 0 0 5px rgba(0,0,0,0.1),0 1px 3px rgba(0,0,0,0.3),0 3px 5px rgba(0,0,0,0.2),0 5px 10px rgba(0,0,0,0.25);
}
.neonText h2 {
  color: #fff;
  text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px #26a2ff, 0 0 25px #26a2ff, 0 0 30px #26a2ff, 0 0 50px #26a2ff, 0 0 80px #26a2ff, 0 0 100px #26a2ff, 0 0 150px #26a2ff
}

.slide-up-enter-active {
  transition: all .5s ease;
}
.slide-up-leave-active {
  transition: all .8s ease;
}
.slide-up-enter, .slide-up-leave-active {
  transform:scale(0,0);
}
</style>
