import request from '@/utils/request'

/**
 * 收货地址列表
 */
export const addressList = (data) => {
  return request({
    url: '/address'
  })
}

// 获取默认收货地址
export const defaultAddr = () => request.get('/address/default')

/**
 * 添加收货地址
 */
export const createAddress = (data) => {
  return request({
    url: '/address',
    method: 'POST',
    data
  })
}

/**
 * 删除收货地址
 */
export const delAddress = (id) => {
  return request({
    url: `/address/${id}`,
    method: 'DELETE'
  })
}

/**
 * 修改收货地址
 */
export const updateAddr = ({ id, user_id, country, ...data }) => {
  return request({
    url: `/address/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 设置默认地址
 */
export const setDefault = (id) => {
  return request({
    url: `/address/${id}`,
    method: 'PATCH'
  })
}
