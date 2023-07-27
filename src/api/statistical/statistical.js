import request from '@/utils/request'

// 统计申报单
export function countDeclare(startTime, endTime) {
  const data = {
    startTime,
    endTime
  }
  return request({
    url: 'baseInfo/statistical/countDeclare',
    method: 'get',
    params: data
  })
}

// 统计申报单 根据时间类型
export function countDeclareByYMD(type) {
  const data = {
    type
  }
  return request({
    url: 'baseInfo/statistical/countDeclareByYMD',
    method: 'get',
    params: data
  })
}

// 统计货物
export function countMaster(startTime, endTime) {
  const data = {
    startTime,
    endTime
  }
  return request({
    url: 'baseInfo/statistical/countMaster',
    method: 'get',
    params: data
  })
}

// 统计货物 根据时间类型
export function countMasterByYMD(type) {
  const data = {
    type
  }
  return request({
    url: 'baseInfo/statistical/countMasterByYMD',
    method: 'get',
    params: data
  })
}
