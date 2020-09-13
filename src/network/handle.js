import {request} from "./request";
import store from "../store";

export function sendIntegral(phoneCode, integral) {
  return request({
    url: '/handle/send',
    params: {
      phoneCode,
      integral
    }
  }).then(res => {
    res = res.data
    if (res.success) {
      // store.commit("setToken", res.token)
      store.commit("setUserInfo", res.data.userinfo)
    }
    return res
  })
}

export function BuyOne(gid, remarks) {
  return request({
    // url: '/home/data',
    url: '/handle/buyone',
    params: {
      gid,
      remarks
    }
  }).then(res => {
    res = res.data
    if (res.success) {
      // store.commit("setToken", res.token)
      store.commit("setUserInfo", res.data.userinfo)
    }
    return res
  })
}

export function update(form) {
  return request({
    url: '/handle/update',
    method: 'post',
    data: form
  }).then(res => {
    res = res.data
    if (res.success) {
      // store.commit("setToken", res.token)
      store.commit("setUserInfo", res.data.userinfo)
    }
    return res
  })
}

export function updatePassword(form) {
  return request({
    url: '/handle/updatePassword',
    method: 'post',
    data: form
  }).then(res => {
    res = res.data
    if (res.success) {
      // store.commit("setToken", res.token)
      store.commit("setUserInfo", res.data.userinfo)
    }
    return res
  })
}

export function updateIntegral(form) {
  return request({
    url: '/handle/updateIntegral',
    method: 'post',
    data: form
  }).then(res => {
    res = res.data
    return res
  })
}

export function updateRecordStatus(rid) {
  return request({
    url: '/handle/updateRecordStatus',
    params: {
      rid
    }
  }).then(res => {
    res = res.data
    return res
  })
}
