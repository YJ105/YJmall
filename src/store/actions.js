import { ADD_COUNTER, ADD_CART } from './mutations-types.js'

export default {
  addToCart(context, payload) {
    return new  Promise((resolve, reject) => {
      //paylaod添加新商品
      // let oldProduct = null
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加1')
      } else {
        payload.count = 1
        context.commit(ADD_CART, payload)
        // state.cartList.push(payload)
        resolve('添加新的商品到购物车')
      }
    })
  }
}