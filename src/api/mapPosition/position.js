import request from '@/utils/request'

// 查询地图位子列表
export function listPosition(query) {
  return request({
    url: '/mapPosition/position/list',
    method: 'get',
    params: query
  })
}

// 查询地图位子详细
export function getPosition(mapId) {
  return request({
    url: '/mapPosition/position/' + mapId,
    method: 'get'
  })
}

// 新增地图位子
export function addPosition(data) {
  return request({
    url: '/mapPosition/position',
    method: 'post',
    data: data
  })
}

// 修改地图位子
export function updatePosition(data) {
  return request({
    url: '/mapPosition/position',
    method: 'put',
    data: data
  })
}

// 删除地图位子
export function delPosition(mapId) {
  return request({
    url: '/mapPosition/position/' + mapId,
    method: 'delete'
  })
}
