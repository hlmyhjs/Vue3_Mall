import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import cart from './modules/cart'
import order from './modules/order'

export default createStore({
  getters,
  modules: {
    user,
    cart,
    order
  }
})
