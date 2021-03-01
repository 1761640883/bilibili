import axios from 'axios'
import router from './src/router'
import Vue from 'vue'

const http = axios.create({// axios.create(config) 对axios请求进行二次封装（防止请求头改变后，需要将所有接口改一遍。而进行第二次封装）
    baseURL: 'http://112.74.99.5:3000/web/api'
})

// 添加一个请求拦截器
http.interceptors.request.use(function (config) {
    // 做一些请求之前被发送
    if(localStorage.getItem('token') && localStorage.getItem('id')){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')// 在这里做一个共用的请求头
    }
    return config;
  }, function (error) {
    // 做一些与请求错误
    return Promise.reject(error);
  });

// 添加一个响应拦截器
http.interceptors.response.use(function (response) {
    // 任何处于2xx范围内的状态代码都会导致该函数触发
    // 使用响应数据
    return response;
  }, function (error) {
    // 任何不在范围2XX原因此功能来触发
    // 做一些与响应错误
    console.dir(error)
    if(error.response.status == 401 || error.response.status == 402){// 这个和全局路由守卫功能重复了
        router.push('/mine/login')
        Vue.prototype.$Modal.info({
            title: '提示',
            content: `<p>${error.response.data.message}</p>`
        });
    }
    return Promise.reject(error);
  });

export default http