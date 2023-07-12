import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://riyugo.com/i/2021/05/19/10uqbxj.png",
    siteTitle: "千楪",
    github: "https://github.com/hzllzh",
    qq: "1160313432",
    qqQrCode:
      "https://riyugo.com/i/2021/05/19/1144qi3.png",
    weixin: "LinZh4609",
    weixinQrCode:
      "https://riyugo.com/i/2021/05/19/zj5gqz.jpg",
    mail: "1160313432@qq.com",
    icp: "黑ICP备17001719号",
    githubName: "DuYi-Edu",
    favicon: "https://riyugo.com/i/2021/05/19/10uqbxj.png",
  },
});
