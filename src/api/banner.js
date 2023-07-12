import request from "./request";

//我不能每写一次都来一次判断，我希望把这个通用的逻辑抽离出去，以后这个接口
//只获取正常的数据

export async function getBanners() {  //如果用这个实例得
    //到的响应它会先运行拦截那个函数，然后把那个函数返回结果给你
    //所以把拦截函数作为 reques 一个文件来写，调用这个文件即可
    return await request.get("/api/banner"); //这里加 ./会报错404
}