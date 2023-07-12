<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
import "@/styles/global.less";
export default {
  components: {
    Menu,
  }, 
};
</script>

<style lang="less">
.test-container{
  width: 400px;
  height: 400px;
  border: 2px solid black;
  background-color: #000;
  margin: 0 auto;
  padding-top: 200px;
}
</style>