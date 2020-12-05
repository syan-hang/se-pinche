// pages/index/index.js
var util = require('../../utils/utils.js');
var match1 = require('../../data/match.js');
var app = getApp();
Page({

//匹配提交
  formSubmit: function (e) {
    console.log(e.detail.value);
    console.log(this.data);
    let that = this;
    var opid = wx.getStorageSync('opid');
    util.getReq('pipei', {
      opid: opid,
      des: e.detail.value,
      map: that.data
    }, function (res) {
      console.log("服务器返回：");
      console.log(res);
      app.globalData.pipei_list = res;
      wx.navigateTo({
        url: '../PiPei/PiPei',
      })
    })
  },

//页面数据
  data: {
    swiperList: [],
    departure: '出发地',
    people_num: '',
    desc: '',
    time_to_get: '',
    car_num: '',
    phone: '',
    destination: {
      name: '目的地',
      lon: 0,
      lat: 0
    },
    getCarPlace: '上车地点',
  },

//出发地点获取
  setDeparture: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          departure: res.name,
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '未获得授权！',
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
    })
  },

//目的地获取
  setDestination: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          destination: {
            name: res.name,
            lon: res.longitude,
            lat: res.latitude
          }
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '未获得授权！',
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
    })
  },

//上车地点获取
  setGetCarPlace: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          getCarPlace: res.name,
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '未获得授权！',
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
    })
  },

// 轮播图图片数据加载
  getSwiperList() {
    let that = this
    var jsonData = require('../../data/swiper_image.js')
    console.log(jsonData);
    that.setData({
      swiperList: jsonData.swiperList,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    match1.match();
    var that = this;
    this.getSwiperList();
    var opid = wx.getStorageSync('opid');
    
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
