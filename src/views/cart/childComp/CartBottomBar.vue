<template>
  <div class="bottom-bar">
    <div class="bottom-content">
      <check-button class="check-button" :isChecked = "isSelectAll" @click.native = "checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="length" @click="compuClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name:'CartBottomBar',
  data() {
    return {

    }
  },
  components: {
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2);
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      //filter 方法
      // if(this.cartList.length === 0) return false
      // return  !(this.cartList.filter(item => !item.checked).length)

      //find方法
      // if(this.cartList.length === 0) return false
      // return !this.cartList.find(item => !item.checked)

      //普通方法
      if(this.cartList.length === 0) return false
      for(let item of this.cartList){
        if(!item.checked){
          return false
        }
       
      }
       return true
      }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){  //全选
        this.cartList.forEach(item => item.checked  = false) 
      }else{
        this.cartList.forEach(item => item.checked  = true) 
      }
    },
    compuClick(){
      if(!this.isSelectAll){
        this.$toast.show('请添加商品到购物车',2000)
      }
    }
  }
}
</script>

<style scoped >
  .bottom-bar{
    width: 100%;
    height: 40px;
    background-color: #eee;
    position: relative;
    /* bottom: 40px; */
    display: flex;
    font-size: 13px;
    align-items: center;
  }
  .bottom-content{
    display: flex;
    align-items: center;
    width: 80px;
    /* background-color:red; */
  }
  .check-button{
    margin-left: 15px;
    margin-right: 10px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .length{
    width: 90px;
    height: 40px;
    background-color: red;
    text-align: center;
    line-height: 40px;
  }
</style>
