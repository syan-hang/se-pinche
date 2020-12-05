
function match(){
  wx.getStorage({
    key: 'opid',
    success: function (res) {
      wx.cloud.callFunction({
        name: 'getMatchListByOpid',
        data: {
          opid: res.data
        },
        success: res => {
          console.log(res);
        },
        fail: res => {
          console.log("err:" + res);
        }
      })
    }, fail: function (res) {
      console.log('获取用户opid失败，重新登录' + res);
      wx.reLaunch({
        url: '../login/login',
      })
    }
  })
}
module.exports = {
  match:match
}