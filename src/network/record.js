import {request} from "./request";
import store from "../store";

export function getRecordData(type, page) {
  return request({
    url: '/record/data',
    params: {
      type,
      page
    }
  }).then(res => {
    res = res.data
    return res
  })
}

export function searchRecord(search, page) {
  return request({
    url: '/record/search',
    params: {
      search,
      page
    }
  }).then(res => {
    res = res.data
    return res
  })
}
