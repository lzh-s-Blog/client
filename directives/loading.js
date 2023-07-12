import loadingUrl from "@/assets/loading.svg"
import styles from "./loading.module.less"
//能否拿到img元素
function getLoadingImage(el) {
    return el.querySelector("img[data-role=loading]");
}

function createLoadingImg() {
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src = loadingUrl;
    img.className = styles.loading;
    return img;
}

export default function (el, binding) {
    //根据binding.value的值，决定创建或删除img元素
    const curImg = getLoadingImage(el);
    if (binding.value) {
        //如果有img元素就不用再创建了,没有就要创建
        if (!curImg) {
            const loadingImg = createLoadingImg();
            el.appendChild(loadingImg);
        }
    } else {
        if (curImg) {
            curImg.remove();
        }
    }
}