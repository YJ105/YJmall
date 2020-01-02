<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list/>

    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'


import {mapGetters}  from 'vuex'

import CartList from './childComp/CartList'
import CartBottomBar from './childComp/CartBottomBar'

export default {
  name:'Cart',
  data() {
    return {

    }
  },
  components: {
    NavBar,

    CartList,
    CartBottomBar
  },
  computed:{
    // ...mapGetters ({
    //   length:'cartLength',
    //   list:'cartList'
    //  })

    ...mapGetters(['cartLength'])
     
    
  }
}
</script>

<style scoped >
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }
</style>
