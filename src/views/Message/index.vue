<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData.js";
import MessageArea from "@/components/MessageArea";
import * as msgApi from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  mixins: [fetchData({ total: 0, row: [] }), mainScroll("messageContainer")],

  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll); //绑定这个滑动条
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll); //取消监听
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total; //如果一开始数组如果是空数组total为0  如果小于data.total说明有更多的数据
    },
  },
  methods: {
    handleScroll(dom) {
      //接着判断是否滚动到底部
      if (this.isLoading || !dom) {
        //目前正在加载更多
        return;
      }
      const range = 100; //在一个可接受的范围，在这个范围内都算达到了底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range && !this.isLoading) {
        this.fetchMore(); //这样时间触发很快 需要加一个isLoading
      }
    },
    //加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        return; //如果没有更多的数据
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async fetchData() {
      return msgApi.getMessage(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback("留言成功");
      this.data.rows.unshift(resp);
    },
  },
};
</script>

<style scoped lang="less">
.message-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
