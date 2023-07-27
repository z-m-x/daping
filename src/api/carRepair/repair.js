import request from '@/utils/request'

// 查询车辆维修列表
export function listRepair(query) {
  return request({
    url: '/carRepair/repair/list',
    method: 'get',
    params: query
  })
}

// 查询车辆维修详细
export function getRepair(reId) {
  return request({
    url: '/carRepair/repair/' + reId,
    method: 'get'
  })
}

// 新增车辆维修
export function addRepair(data) {
  return request({
    url: '/carRepair/repair',
    method: 'post',
    data: data
  })
}

// 修改车辆维修
export function updateRepair(data) {
  return request({
    url: '/carRepair/repair',
    method: 'put',
    data: data
  })
}

// 删除车辆维修
export function delRepair(reId) {
  return request({
    url: '/carRepair/repair/' + reId,
    method: 'delete'
  })
}
