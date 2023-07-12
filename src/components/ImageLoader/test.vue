<template>
    <div class="test-container">
        <ImageLoader 
        :src="src" 
        :placeholder="placeholder"
        @load="load"    
    />
    </div>
</template>

<script>
import ImageLoader from "./"
export default {
    components:{
        ImageLoader,
    },
    data() {
        return {
            src: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304",
            placeholder: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100",
        };
    },
    methods: {
        load(){
            console.log("图片加载完成");
        }
    }
}
</script>

<style>
@import "~@/styles/mixin.less";
.test-container{
    width: 800px;
    height: 600px;
    margin: 0 auto;
    border: 1px solid black;
}
</style>