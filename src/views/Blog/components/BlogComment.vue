<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
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
    window.fetchMore = this.fetchMore; //方便测试
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
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    }, //以后找不到数据看这条关键语句 ,找了很久的bug
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
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("评论成功"); //告诉子组件，我这边处理完了，你继续
    },
  },
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  margin: 30px 0;
}
</style>