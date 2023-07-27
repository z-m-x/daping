import request from '@/utils/request'

// 查询货物备案列表
export function listGoods(query) {
  return request({
    url: '/goodsfilings/goods/list',
    method: 'get',
    params: query
  })
}

// 查询货物备案详细
export function getGoods(goodsId) {
  return request({
    url: '/goodsfilings/goods/' + goodsId,
    method: 'get'
  })
}

// 新增货物备案
export function addGoods(data) {
  return request({
    url: '/goodsfilings/goods',
    method: 'post',
    data: data
  })
}

// 修改货物备案
export function updateGoods(data) {
  return request({
    url: '/goodsfilings/goods',
    method: 'put',
    data: data
  })
}

// 删除货物备案
export function delGoods(goodsId) {
  return request({
    url: '/goodsfilings/goods/' + goodsId,
    method: 'delete'
  })
}
