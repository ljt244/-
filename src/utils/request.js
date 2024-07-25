import axios from 'axios'
import { Toast } from 'vant';
// 创建axios实例，将来对创建的实例进行自定义配置
// 好处不会污染原始的axios实例
const instance = axios.create({
    baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
    timeout: 5000
  });
  // 添加请求拦截器
  instance.interceptors.request.use(function (config) {
    const key = JSON.parse(localStorage.getItem('hm_shopping_info')) || ''
    const token = key.token
    if (token) { 
      config.headers['Access-Token'] = token
      config.headers.platform = 'H5'
      config.headers['Content-Type'] = 'application/json'
    }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
     const res = response.data;
     console.log(res);
     if (res.status !== 200) {
      // 错误提示
      Toast(res.message)
      // 抛出一个错误的promise
      return Promise.reject(res.message)
     }
     return res
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  export default instance