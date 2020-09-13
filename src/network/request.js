import axios from 'axios'
import router from "../router";
import store from "../store";

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://47.93.49.16:7001/api',
    // baseURL: 'http://localhost:7001/api',
    timeout: 5000,
  })


  //http request 拦截器
  instance.interceptors.request.use(config => {
    const token = store.state.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }, err => {
    console.log(err);
    return Promise.reject(err)
  })

  //http response 拦截器
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          // store.commit("delToken");
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
          });
      }
    }
    console.log(err);
    return Promise.reject(err.response.message)
  })

  return instance(config)
}
