import qs from 'qs'
import request from '@/utils/request'

// 发起支付
export const payment = (data) => request.post('/payment', data)

/**
 * 支付结果查询
 */
export const successPayment = (data) => {
  return request({
    url: '/payment/successPayment',
    method: 'POST',
    data: qs.stringify(data)
  })
}
