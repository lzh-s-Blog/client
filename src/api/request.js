import showMessage from "../utils/showMessage";
import axios from "axios";

//创建一个axios的实例 一个拦截器，用这个东西去请求，每一次都会运行这个东西
const ins = axios.create();
ins.interceptors.response.use(function (resp) { //拦截过后会运行这个函数
    if(resp.data.code !== 0){  //如果有错误要显示错误
        showMessage({
            content: resp.data.msg,
            type: "error",
            duration: 1500,
        });
        return null; //有错误就返回null
    }
    return resp.data.data; 
});

export default ins;