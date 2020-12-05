//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:"se-pinche-wpxcl"
    })

    // 检查当前登录状态是否有效
    var that = this;
    wx.checkSession({
      success: function () {
        console.log("当前登录状态有效！");
        wx.getStorage({
          key: 'opid',
          success: function (res) {
            var opid = res.data;
            
          },
          fail: function () {
            wx.reLaunch({
              url: '/pages/login/login'
            });
          }
        })

        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            that.globalData.userInfo = res.data;
          },
          fail: function () {
            that.login();
          }
        });
      },
      fail: function () {
        //登录态过期
        console.log("状态过期");
        wx.reLaunch({
          url: '/pages/login/login'
        });
      }
    })
  },


  set_userInfo: function (data) {   //将用户信息缓存保存
    this.globalData.userInfo = data;
    wx.setStorage({
      key: "userInfo",
      data: data
    })
  },

  set_opid: function (data) {   //将用户信息缓存保存
    this.globalData.opid = data;
    wx.setStorage({
      key: "opid",
      data: data
    })
  },

   globalData: {
    userInfo: null,
    opid: null,
    pipei_list: []
  }
})
