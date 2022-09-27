import {
  ADD_GOODS,
  INIT_SHOP_CART,
  REDUCE_CART,
  REMOVE_CART,
  SELECTED_SINGLE_GOODS,
  SELECTED_ALL_GOODS,
  CLEAR_CART
} from './mutations-type'
import { cartsList } from '@/api/cart'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    shopCart: {},
    cartCount: 0,
    selectArr: []
  },
  mutations: {
    // 1. 往购物车中添加数据(增加商品数量)
    [ADD_GOODS](state, { cartId, goodsId, name, small_image, price }) {
      const shopCart = state.shopCart

      // 1.1如果商品不存在
      if (!shopCart[goodsId]) {
        shopCart[goodsId] = {
          num: 1,
          goodsId,
          cartId,
          name,
          small_image,
          price,
          checked: true
        }
      }
      // 1.2 产生新对象
      state.shopCart = { ...shopCart }
      // // 1.3 存入本地
      setItem('shopCart', state.shopCart)
      this.commit('cart/INIT_SHOP_CART')
    },

    // 2. 页面初始化获取购物车的数据（本地）
    [INIT_SHOP_CART](state) {
      const initCart = getItem('shopCart')
      // let num = 0
      // for (const key in initCart) {
      //   if (Object.hasOwnProperty.call(initCart, key)) {
      //     const element = initCart[key];
      //     num += element.num
      //   }
      // }
      if (initCart) {
        state.shopCart = initCart
        // state.cartCount = num
        state.cartCount = Object.getOwnPropertyNames(state.shopCart).length
        state.selectArr = Object.values(state.shopCart).filter((value) => value.checked)
      }
    },

    // 3. 减少购物车商品数量
    [REDUCE_CART](state, { goodsId }) {
      const shopCart = state.shopCart
      const goods = shopCart[goodsId]
      if (goods) {
        // 找到该商品
        //  同步到shopCart中
        state.shopCart = { ...shopCart }
        // 同步到本地
        setItem('shopCart', state.shopCart)
      }
    },

    // 把商品移出购物车
    [REMOVE_CART](state, { goodsId }) {
      const shopCart = state.shopCart
      const goods = shopCart[goodsId]
      if (typeof goodsId === 'object') {
        goodsId.forEach((id) => {
          delete shopCart[id]
        })
      } else {
        if (goods) delete shopCart[goodsId]
      }
      // 1.2 产生新对象
      state.shopCart = { ...shopCart }
      // 1.3 存入本地
      setItem('shopCart', state.shopCart)
      this.commit('cart/INIT_SHOP_CART')
    },

    // 4. 单个商品选中和取消选中
    [SELECTED_SINGLE_GOODS](state, { goodsId }) {
      const shopCart = state.shopCart
      const goods = shopCart[goodsId]
      if (goods) {
        if (goods.checked) {
          // 存在该属性
          goods.checked = !goods.checked
        } else {
          goods.checked = true
        }
        // 4.1 同步数据并进行本地化
        state.shopCart = { ...shopCart }
        setItem('shopCart', state.shopCart)
      }
    },

    // 5. 商品的全选和取消全选
    [SELECTED_ALL_GOODS](state, { isSelected }) {
      const shopCart = state.shopCart
      Object.values(shopCart).forEach((goods) => {
        if (goods.checked) {
          goods.checked = !isSelected
        } else {
          goods.checked = !isSelected
        }
      })
      state.shopCart = { ...shopCart }
      setItem('shopCart', state.shopCart)
    },

    // 6. 清空购物车
    [CLEAR_CART](state) {
      // 6.1 vuex数据置空
      state.shopCart = null
      state.shopCart = { ...state.shopCart }
    }
  },
  actions: {
    async getCartList(ctx) {
      const res = await cartsList()
      if (res?.success) {
        const cartArr = res.data.list
        const shopCart = {}
        cartArr.forEach((value) => {
          shopCart[value.good.id] = {
            num: value.number,
            cartId: value.id,
            goodsId: value.good.id,
            name: value.good.goods_name,
            small_image: value.good.goods_img,
            price: value.good.price,
            checked: value.selected
          }
        })

        setItem('shopCart', shopCart)
        ctx.commit('INIT_SHOP_CART')
      }
    }
  },
  getters: {
    selectedNumber(state) {
      return state.selectArr.length
    },
    totalPrice(state) {
      let totalPrice = 0
      state.selectArr.forEach((goods) => {
        totalPrice += goods.num * Number(goods.price)
      })
      return totalPrice
    }
  }
}
