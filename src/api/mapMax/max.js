import request from '@/utils/request'

// 查询地图统计列表
export function listMax(query) {
  return request({
    url: '/mapMax/max/list',
    method: 'get',
    params: query
  })
}

// 查询地图统计详细
export function getMax(mapId) {
  return request({
    url: '/mapMax/max/' + mapId,
    method: 'get'
  })
}

// 新增地图统计
export function addMax(data) {
  return request({
    url: '/mapMax/max',
    method: 'post',
    data: data
  })
}

// 修改地图统计
export function updateMax(data) {
  return request({
    url: '/mapMax/max',
    method: 'put',
    data: data
  })
}

// 删除地图统计
export function delMax(mapId) {
  return request({
    url: '/mapMax/max/' + mapId,
    method: 'delete'
  })
}
