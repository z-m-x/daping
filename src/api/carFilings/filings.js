import request from '@/utils/request'

// 查询车辆备案列表
export function listFilings(query) {
  return request({
    url: '/carFilings/filings/list',
    method: 'get',
    params: query
  })
}

// 查询车辆备案详细
export function getFilings(carId) {
  return request({
    url: '/carFilings/filings/' + carId,
    method: 'get'
  })
}

// 新增车辆备案
export function addFilings(data) {
  return request({
    url: '/carFilings/filings',
    method: 'post',
    data: data
  })
}

// 修改车辆备案
export function updateFilings(data) {
  return request({
    url: '/carFilings/filings',
    method: 'put',
    data: data
  })
}

// 删除车辆备案
export function delFilings(carId) {
  return request({
    url: '/carFilings/filings/' + carId,
    method: 'delete'
  })
}
