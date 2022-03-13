import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  return JSON.parse(localStorage.cartList) || {}
}
export default createStore({
  state: {
    cartList: getLocalCartList()
    // { shopId: { shopName:'', productList: { productId: {} } } }
    // shopId: {
    //   shopName: '',
    //   productList: {
    //     _id: '',
    //     name: '',
    //     imgUrl: '',
    //     sales: 0,
    //     price: 33.6,
    //     oldPrice: 39.6,
    //     count: 0
    //   }
    // }
  },
  mutations: {
    changeCartItemInfor (state, payload) {
      const {
        shopId,
        productId,
        productInfo,
        num
      } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      payload.num > 0 && (product.check = true)
      product.count < 0 && (product.count = 0)
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked (state, payload) {
      const {
        shopId,
        productId
      } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const {
        shopId,
        shopName
      } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    }
  },
  actions: {},
  modules: {}
})
