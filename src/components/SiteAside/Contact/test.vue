<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import "@/styles/global.less";
import Contact from "./";
export default {
  components: {
    Contact,
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