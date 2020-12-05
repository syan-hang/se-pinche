// miniprogram/pages/alert_info/alert_info.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchList: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getMatchList(this);
  },

})
function getMatchList (a) {
  wx.getStorage({
    key: 'opid',
    success: function (res) {
      wx.cloud.callFunction({
        name: 'getMatchListByOpid',
        data: {
          opid: res.data
        },
        success: res => {
          console.log('获取匹配信息成功：\n', res.result.data);
          a.setData({
            matchList: res.result.data
          })
        },
        fail: res => {
          console.log('获取匹配信息失败：' + res);
        }
      })
    },
    fail: function (res) {
      wx.reLaunch({
        url: '../login/login',
      })
    }
  })
}