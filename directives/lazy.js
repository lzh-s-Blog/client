import eventBus from "@/eventBus"
import { debounce } from "@/utils";
import defaultGif from "@/assets/default.gif";

let imgs = []; //这个数组是需要加载的图片，需要在特定事件往这里面加图片

function setImage(img){
    img.dom.src = defaultGif; //先暂时使用默认图片
    //处理图片
    //该图片是否在视口范围内
    const clientHeight = document.documentElement.clientHeight; //当前的视口高度
    const rect = img.dom.getBoundingClientRect(); //获取某个元素相对于视窗的位置集合
    const height = rect.height || 150;  //没有值就给一个最小高度150
    if(rect.top >= -height && rect.top <= clientHeight){
        //在视口范围内
        img.dom.src = img.src;
        imgs = imgs.filter((i) => i !== img); //处理过的图片移除掉
    }

}



//希望，调用该函数，就可以设置那些合适的图片 
function setImages(){ //滚动条滚动的时候调用 => 事件监听
    for (const img of imgs) {
        //处理该图片
        setImage(img);
    }
}

function handleScroll(){
    setImages();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

export default{
    inserted(el, bindings){ //已经加到父元素里面 ，这样才能拿到数据
        const img = {
            dom: el,
            src: bindings.value,
          };
          imgs.push(img);
          // 立即处理它
          setImage(img);
    },
    unbind(el){
        imgs = imgs.filter((img) => img.dom !== el)
    }
};