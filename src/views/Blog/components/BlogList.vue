<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="left" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="right">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论: {{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >{{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页放在这里 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll.js"
import Empty from "@/components/Empty";
export default {
  mixins: [fetchData({total:0, rows:[]}), mainScroll("mainContainer")],
  components: {
    Pager,
    Empty,
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlogs(
        this.routeInfo.categoryId,
        this.routeInfo.page,
        this.routeInfo.limit
      );
    },
    handlePageChange(newPage) {
      //console.log(newPage);
      //  /article?page = $(newPage)&limit = ${this.routeInfo.limit}
      //  /article/cate/${this.routeInfo.categoryId}?page=$page = $(newPage)&limit = ${this.routeInfo.limit}

      const query = {
        limit: this.routeInfo.limit,
        page: newPage,
      };
      if (this.routeInfo.categoryId === -1) {
        //当前没有分类 做无刷新跳转
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          parms: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1,
        page = +this.$route.query.page || 1,
        limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid @gray;
    .left {
      flex: 0 0 auto;
      margin-right: 15px;
      img {
        max-width: 200px;
        border-radius: 5px;
        display: block;
      }
    }
    .right {
      flex: 1 1 auto;
      h2 {
        margin: 0;
      }
      .aside {
        font-size: 12px;
        color: @gray;
        span {
          margin-right: 15px;
        }
      }
      .desc {
        margin: 15px 0;
        font-size: 14px;
      }
    }
  }
}
</style>