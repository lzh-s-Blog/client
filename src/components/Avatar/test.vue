<template>
  <div>
    <h1>App组件</h1>
    <Avatar url="https://tse1-mm.cn.bing.net/th?id=OIP.ZwatLnpo7avdvBtWRHB8TwHaE8&w=136&h=100&c=8&rs=1&qlt=90&dpr=1.07&pid=3.1&rm=2" 
      :size=500
    />
  </div>
</template>

<script>
import Avatar from "./";
export default {
  name: "App", //如果组件没有在注册的时候指定名字，则使用该名字
  components: {
    Avatar,
  },
};
</script>