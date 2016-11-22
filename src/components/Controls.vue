<template>
	<transition name="slide-fade">
	<div class="controls">
	     <audio id="media" :src="mp3Url" controls></audio> 
	</div>
	</transition>
</template>

<script>

export default {
  name: 'controls',
  data () {
    return {
      mp3Url:''
    }
  },
  created(){
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controls{
	
}

</style>
