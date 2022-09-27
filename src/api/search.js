import request from '@/utils/request'

/**
 * 获取商品详情
 */
export const searchGoods = (goods_name, orderBy) => {
  return request({
    url: '/goods/search',
    params: {
      goods_name,
      orderBy,
      pageSize: 50
    }
  })
}
