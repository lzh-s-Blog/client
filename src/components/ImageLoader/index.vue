<template>
  <div class="ImageLoader-container">
    <img v-if="everything" class="placeholder" :src="placeholder" />
    <img
      @load="handleLoad"
      :src="src"
      :style="{ opacity: loadTimes, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      requires: true,
    },
    placeholder: {
      type: String,
      requires: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoad: false,
      everything: true,
    };
  },
  computed: {
    loadTimes() {
      return this.originLoad ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      //原始图片加载后触发
      setInterval(() => {
        this.everything = false;
      }, this.duration);
      this.originLoad = true;
/*       console.log("图片加载完成"); */
      this.$emit("load");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.ImageLoader-container {
  position: relative;
  height: 100%;
  width: 100%;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>