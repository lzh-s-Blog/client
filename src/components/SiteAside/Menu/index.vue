<template>
  <nav class="menu-container">
    <RouterLink :exact="n.exact" :to="{name: n.name}" v-for="n in items" :key="n.link">
      <div class="icon">
        <Icon :type="n.icon" />
      </div>
      <span>{{ n.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, //是否精确匹配
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
  methods: {
    selected(item) {
      let link = item.link; //当前菜单的链接地址
      let curPath = location.pathname; //获取当前网址的链接地址
      //判断当前链接地址是否以菜单链接地址开头
      if (item.startWith) {
        return curPath.startsWith(link);
      } else {
        return curPath == link;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  padding: 0;
  list-style: none;
  margin: 24px 0;
  color: @gray;
  a {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 50px;
    &.router-link-active {
      background: darken(@words, 3%);
    }
    &:hover {
      color: #fff;
    }
  }
  .icon {
    width: 24px;
  }
}
</style>  