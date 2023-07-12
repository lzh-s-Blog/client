<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import debounce from "@/utils/debounce";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  props: {
    toc: {
      type: Array,
    },
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 300);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed(){
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  computed: {
    //根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
    tocWithSelect() {
      const getTOC = (toc = []) => {
        //toc可能是空数组，要给个[]
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    //根据toc属性得到他们对应的元素数组
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    //设置activeAnchor为正确的值
    setSelect(scrollDom) {
      if(!scrollDom){
        return;
      }
      this.activeAnchor = "";
      const range = 200;
      for (const dom of this.doms) {
        //看一下当前这个dom元素是不是被选择中
        if (!dom) {
          //如果没有dom元素
          continue;
        }

        //得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;

        //在规定的范围内
        if (top >= 0 && top <= range) {
          this.activeAnchor = dom.id;
        } else if (top > range) {
          //在规定范围的下方
          return;
        } else {
          //在规定范围的上方
          this.activeAnchor = dom.id; //假设自己是激活的
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>