import  { ADD_COUNTER, ADD_CART}  from './mutations-types'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_CART](state, payload) {
    // payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  }
}