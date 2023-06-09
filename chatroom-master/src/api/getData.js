import base from './index'
import jwtDecode from 'jwt-decode';
let axios = base.axios
let baseUrl = base.baseUrl

// 获取好友
// export const getFriend = params => {
//   return axios({
//     method: 'post',
//     baseURL: `http://localhost:9025/friend/friendList`,
//     data: params
//   }).then(res => res.data)
// }

// 获取聊天信息
export const getChatMsg = params => {
  return axios({
    method: 'post',
    baseURL: `http://localhost:9025/friend/chatMsg`,
    data: params
  }).then(res => res.data)
}

// 获取当前时间
const currentTime = new Date();
// 格式化日期和时间
const formattedDate = currentTime.toLocaleDateString('en-US');
const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: false });
// 拼接日期和时间字符串
const formattedDateTime = `${formattedDate} ${formattedTime}`;
export { formattedDateTime };


// 解析JWT Token
const decodeJWT = (jwtToken) => {
  try {
    const decodedToken = jwtDecode(jwtToken);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};
// 解析token
const token = localStorage.getItem('token');
const decoded = decodeJWT(token);
console.log("decoded"+decoded)
export { decoded };
