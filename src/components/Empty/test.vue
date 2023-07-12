<template>
  <div class="test-container">
      <Empty :text="text"/>
  </div>
</template>

<script>
import Empty from "./"
export default {
    components:{
        Empty,
    },
    data() {
        return {
            text:"asassfasasassfasascasasassfasasca",
        }
    },
}
</script>

<style>
    .test-container{
        width: 500px;
        height: 400px;
        border: 1px solid black;
        margin: 0 auto;
        position: relative;
    }
</style>