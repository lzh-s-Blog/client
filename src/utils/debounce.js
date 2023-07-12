//一段时间后运行此函数
export default function(fn, duration=10000000){
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn(...args);
        }, duration)
    }
}