import request from '@/utils/request'

// 生成订单
export const createOrder = (data) => request.post('/orders', data)

// 订单列表
export const orderList = (query) => request.get(`/orders?status=${query.status}`)

// 修改订单地址
export const updateOrderAddr = (id, addrId) => request.patch(`/orders/${id}/updateAddr/${addrId}`)

/**
 * 修改订单状态
 */
export const updateOrderStatus = (id, status) => {
  return request({
    url: `/orders/${id}`,
    method: 'PATCH',
    data: { status }
  })
}

/**
 * 查询订单
 */
export const selectOrderById = (orderId) => {
  return request({
    url: `/orders/selecOrder?orderId=${orderId}`
  })
}

// 删除订单
export const delOrders = (id) => request.delete(`/orders/delete/${id}`)
