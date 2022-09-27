import request from '@/utils/request'

/**
 * 获取商品详情
 */
export const goodscategory = (id, filters) => {
  return request({
    url: `/goods/category/${id}`,
    params: {
      orderBy: filters,
      pageSize: 50
    }
  })
}
