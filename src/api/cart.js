import request from '@/utils/request'

// 加入购物车
export const addCart = (goods_id) => {
  return request({
    url: '/carts',
    method: 'POST',
    data: {
      goods_id
    }
  })
}

// 购物车列表
export const cartsList = () => request('/carts')

// 删除购物车
export const delCarts = (ids) => request.delete('/carts', { data: { ids } })

/**
 * 修改购物车商品(数量, 选中状态)
 */
export const updateCart = (id, data) => {
  return request({
    url: `/carts/${id}`,
    method: 'PATCH',
    data
  })
}

// 全选 || 全不选
export const selectAll = (data) => request.post('/carts/selectAll', data)

/**
 * 全不选
 */
export const unSelectAll = () => request.post('/carts/unSelectAll')
