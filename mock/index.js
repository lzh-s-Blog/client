//用来导入mock数据
//将来如果有别的模拟数据就直接import导入
//main.js只用导入这个就可以了

import "./banner";  //如果将来这个开发好了，直接将这个注释
import "./blog";
import "./setting";
import "./about";
import "./project";
import "./message";
import Mock from "mockjs";
Mock.setup({ //设置网络延迟，数据要1000-2000ms才能发给我
    timeout: "1000-2000",
});
