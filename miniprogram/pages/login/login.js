// pages/toLogin/toLogin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    appInfo: {},
    login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  bindGetUserInfo: function (e) {
    log_in();
  },
})

function log_in() {
  wx.login({//login流程
    success: function (res) {//登录成功
      console.log("本地登录1:",res);
      if (res.code) {
        var code = res.code;
        wx.getUserInfo({//getUserInfo流程
          success: function (res2) {//获取userinfo成功
            console.log("本地登录2:",res2);
            app.set_userInfo(res2.userInfo);
            login();
          },
          fail: function () {
            console.log("登录2请求失败");
          }
          
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });

  function login(){
    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      duration: 10000
    });
    wx.cloud.callFunction({
      name:"get_opid",
      success(res){
        console.log("获取opid成功：",res);
        app.set_opid(res.result.userInfo.openId);
        wx.reLaunch({
          url: '/pages/index/index',
        });
      },fail(res){
        console.log("获取opid失败：", res);
      }
    })
  }
}