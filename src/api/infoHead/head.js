import request from '@/utils/request'

// 查询车辆调度主列表
export function listHead(query) {
  return request({
    url: '/infoHead/head/list',
    method: 'get',
    params: query
  })
}

// 查询车辆调度主详细
export function getHead(infoHeadId) {
  return request({
    url: '/infoHead/head/' + infoHeadId,
    method: 'get'
  })
}

// 新增车辆调度主
export function addHead(data) {
  return request({
    url: '/infoHead/head',
    method: 'post',
    data: data
  })
}

// 修改车辆调度主
export function updateHead(data) {
  return request({
    url: '/infoHead/head',
    method: 'put',
    data: data
  })
}

// 删除车辆调度主
export function delHead(infoHeadId) {
  return request({
    url: '/infoHead/head/' + infoHeadId,
    method: 'delete'
  })
}
