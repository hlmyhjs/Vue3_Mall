import request from '@/utils/request'

/**
 * 首页数据
 */
export const homePage = () => {
  return request({
    url: '/homePage'
  })
}

export const getHomeData = (type, pageNum) => {
  return request({
    url: '/goods',
    params: {
      // type,
      pageNum,
      pageSize: 20
    }
  })
}
