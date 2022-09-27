import { INIT_OREDER } from './mutations-type'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    list: [],
    order_id: getItem('orderId') || ''
  },
  mutations: {
    [INIT_OREDER](state, orderId) {
      state.list = orderId
      //存储订单号
      state.order_id = orderId

      //设置一个id号
      setItem('orderId', orderId)
    }
  }
}
