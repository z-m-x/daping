import request from '@/utils/request'

// 查询车辆调度体列表
export function listBody(query) {
  return request({
    url: '/infoBody/body/list',
    method: 'get',
    params: query
  })
}

// 查询车辆调度体详细
export function getBody(goodsId) {
  return request({
    url: '/infoBody/body/' + goodsId,
    method: 'get'
  })
}

// 新增车辆调度体
export function addBody(data) {
  return request({
    url: '/infoBody/body',
    method: 'post',
    data: data
  })
}

// 修改车辆调度体
export function updateBody(data) {
  return request({
    url: '/infoBody/body',
    method: 'put',
    data: data
  })
}

// 删除车辆调度体
export function delBody(goodsId) {
  return request({
    url: '/infoBody/body/' + goodsId,
    method: 'delete'
  })
}
