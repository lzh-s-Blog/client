<template>
  <div class="test-container">
      <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./"
export default {
   components:{
       SiteAside,
   } 
}
</script>

<style lang="less">
.test-container{
    width: 300px;
    height: 800px;
    border: 2px solid black;
    background: #000;
    margin: 0 auto;
}
</style>