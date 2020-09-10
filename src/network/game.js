import {request} from "./request";
import store from "../store";

export function getGameData() {
  return request({
    url: '/game/data',
    params: {

    }
  }).then(res => {
    res = res.data
    return res
  })
}

export function signUp(gameid) {
  return request({
    url: '/game/signUp',
    params: {
      gameid
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


export function createGame(form) {
  return request({
    url: '/game/create',
    params: form
  }).then(res => {
    res = res.data
    return res
  })
}
