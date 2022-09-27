import request from '@/utils/request'

/**
 * 获取商品详情
 */
export const goodsDetail = (id) => request(`/goods/detail/${id}`)
