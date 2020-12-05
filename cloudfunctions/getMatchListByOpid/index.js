// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const result = await db.collection('match_record').where({
    opid: event.opid
  }).get()
  var user_info = result.data[0];
  var src = user_info.pb_src;
  var dst = user_info.pb_dst;
  var res = db.collection('match_record').where({
    pb_dst: _.geoNear({
      geometry: dst,
    })
  }).get();
  return res;

}

// 计算一定距离的经纬度范围
function calculate_range(lng1,lat1){
  d = 10000
  R = 6370996.81
  pi = 3.1415926

  dx = Math.acos((Math.cos(d / R) - Math.sin(lat1 * pi / 180) * Math.sin(lat1 * pi / 180)) / (Math.cos(lat1 * pi / 180) * Math.cos(lat1 * pi / 180))) * 180 / pi
  dy = 180 * d / R / pi

  lng2 = lng1 - dx
  lat2 = lat1

  distance = R * Math.acos(Math.cos(lat1 * pi / 180) * Math.cos(lat2 * pi / 180) * Math.cos(lng1 * pi / 180 - lng2 * pi / 180) + Math.sin(lat1 * pi / 180) * Math.sin(lat2 * pi / 180))
  return {dx,dy};
}