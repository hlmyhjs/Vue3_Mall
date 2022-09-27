import request from '@/utils/request'

/**
 * 获取分类列表
 */
export const categories = () => {
  return request({
    url: `/categories`
  })
}
