import request from '@/utils/request'

// 查询车辆加油记录列表
export function listRefuel(query) {
  return request({
    url: '/carRefuel/refuel/list',
    method: 'get',
    params: query
  })
}

// 查询车辆加油记录详细
export function getRefuel(refId) {
  return request({
    url: '/carRefuel/refuel/' + refId,
    method: 'get'
  })
}

// 新增车辆加油记录
export function addRefuel(data) {
  return request({
    url: '/carRefuel/refuel',
    method: 'post',
    data: data
  })
}

// 修改车辆加油记录
export function updateRefuel(data) {
  return request({
    url: '/carRefuel/refuel',
    method: 'put',
    data: data
  })
}

// 删除车辆加油记录
export function delRefuel(refId) {
  return request({
    url: '/carRefuel/refuel/' + refId,
    method: 'delete'
  })
}
