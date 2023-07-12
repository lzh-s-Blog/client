<template>
  <div
    v-loading="loading"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
  >
    <ul
      class="carousel-container"
      :style="{ marginTop }"
      @transitionend="handleTransitonEnd"
    >
      <li v-for="item in data" :key="item.id">
        <Carouselitem :carousel="item" />
      </li>
    </ul>
    <div @click="moveTo(index - 1)" v-show="index > 0" class="icon icon-up">
      <Icon type="arrowUp" />
    </div>
    <div
      @click="moveTo(index + 1)"
      v-show="index < data.length - 1"
      class="icon icon-down"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        @click="moveTo(i)"
        :class="{ active: i == index }"
        v-for="(item, i) in data"
        :key="item.id"
      ></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon";
import Carouselitem from "./Carouselitem";

export default {
  components: {
    Icon,
    Carouselitem,
  },
  data() {
    return {
      //banners: [],
      //isLoading: true,  配置了全局v-loading了

      index: 0, //显示第几张轮播图
      containerHeight: 0, //整个容器的高度
      switching: false, // 是否正在切换中
    };
  },
  /*   async created() {
    //在被创建的时候拿到数据
    this.banners = await getBanners();
    this.isLoading = false;
  }, */
  created(){
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
        window.addEventListener("resize", this.handleResize);
  },
  
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: { 
    moveTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      //上滑
      if (e.deltaY < -5 && this.index > 0) {
        this.switching = true;
        this.index--;
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
        //下滑
        this.switching = true;
        this.index++;
      }
    },
    handleTransitonEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
      this.containerWidth = this.$refs.container.clientWidth;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .carousel-container {
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 100%;
    }
    transition: 500ms;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .icon {
    font-size: 30px;
    @gap: 25px;
    .self-center();
    cursor: pointer;
    transform: translateX(-50%);
    color: #fff;
    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: jump-down 2s infinite;
    }
    @jump: 10px;
    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
  }
  .indicator {
    .self-center();
    transform: translateY(-50%);
    right: 20px;
    left: auto;
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;

      &.active {
        background: #fff;
      }
    }
  }
}
</style>
