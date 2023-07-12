import getComponentRootDom from "./getComponentsDom"
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";
/**
 * @param {String} content 消息内容 
 * @param {Srting} tyoe 消息类型 info error success warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中，不传则显示到页面正中
 */
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    //创建消息元素
    const div = document.createElement('div');
    const iconDom = getComponentRootDom(Icon, {
        type,
    });
    div.innerHTML = `<span>${iconDom.outerHTML}</span><div>${content}</div>`;

    //设置样式
    div.className = `${styles.message} ${styles[`message-${type}`]}`;


    //将div加到容器中

    if (options.container) { //如果设置了container
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative"; //不要让body也设置为relative
        }
    }


    container.appendChild(div);

    //浏览器强行渲染
    div.clientHeight;

    //回归正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;

    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-25px)`;

        div.addEventListener("transitionend", function () {
            div.remove();
            options.callback && options.callback();
        }, {
            once: true
        })
    }, duration);
}