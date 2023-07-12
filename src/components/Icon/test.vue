<template>
    <div>
        <h1>App组件</h1>
        <Icon type="home" 
        />
    </div>
</template>

<script>
import Icon from "./";
export default {
    components:{
        Icon,
    },
};
</script>

<style scoped>
    .iconfont{
        color: red;
        font-size: 30px;
    }
</style>