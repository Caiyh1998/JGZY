import {request} from "./request";

export function getStoreData(type, page = 1) {
  return request({
    url: '/store/data',
    params: {
      type,
      page
    }
  }).then(res => {
    res = res.data
    return res
  })
}
