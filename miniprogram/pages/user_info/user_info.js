// pages/GeRenInfo/GeRenInfo.js
var util = require('../../utils/utils.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    GeRenInfo: {
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getGeRenInfo() {
    let that = this;
    var jsonData = require('../../data/get_user_info.js');
    wx.getStorage({
      key: 'opid',
      success: function (res) {
        // 根据用户opid在数据库中查找用户信息，若没有则使用默认字段
      },
    })
  },

  submit: function (e) {
    console.log("提交的个人信息：");
    console.log(e.detail.value);
    wx.showToast({
      title: '保存成功！',
      icon: 'none',
      duration: 2000
    });
    wx.getStorage({
      key: 'opid',
      success: function (res) {
        util.getReq('upload_data', {
          user_info: e.detail.value,
          opid: res.data
        }, function (res) {
          console.log(res);
        });
      },
    })
  },

  onLoad: function (options) {
    this.getGeRenInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
})
