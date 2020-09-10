import {request} from "./request";

export function getUserData(page) {
  return request({
    url: '/user',
    params: {
      page
    }
  }).then(res => {
    res = res.data
    return res
  })
}


export function searchUser(search, page) {
  return request({
    url: '/user/search',
    params: {
      search,
      page
    }
  }).then(res => {
    res = res.data
    return res
  })
}

export function getRecordData(status,page) {
  return request({
    url: '/record/get',
    params: {
      status,
      page
    }
  }).then(res => {
    res = res.data
    return res
  })
}


export function searchRecord(search, page) {
  return request({
    url: '/record/searchAll',
    params: {
      search,
      page
    }
  }).then(res => {
    res = res.data
    return res
  })
}

