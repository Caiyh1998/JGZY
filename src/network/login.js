import {request} from "./request";
import store from "../store";

export function userLogin(form) {
  return request({
    url: '/login/user',
    method: 'post',
    data: form
  }).then(res => {
    res = res.data
    if (res.code == 0) {
      store.commit("setToken", res.token)
      store.commit("setUserInfo", res.data)
    }
    return res
  })
}

export function userRegister(form) {
  return request({
    url: '/register/user',
    method: 'post',
    data: form
  }).then(res => {
    console.log(res);
    res = res.data
    if (res.code == 0) {
      store.commit("setToken", res.token)
      store.commit("setUserInfo", res.data)
    }
    return res
  })
}

export function adminLogin(form) {
  return request({
    url: '/login/admin',
    method: 'post',
    data: form
  }).then(res => {
    res = res.data
    if (res.code == 0) {
      store.commit("setToken", res.token)
      store.commit("setUserInfo", res.data)
    }
    return res
  })
}
