<template>
  <div id="profile"> 
    <nav-bar class="nav-bar"><div slot="center">购物商城</div></nav-bar>

    <user-info></user-info>

    <div class="account">
      <div class="account-item">
        <div class="number">
          <p><span class="balance">0.00</span>元</p>
        </div>
        <div class="account-info">我的余额</div>
      </div>

       <div class="account-item">
        <div class="number">
          <p><span class="balance">0</span>个</p>
        </div>
        <div class="account-info">我的优惠</div>
      </div>

       <div class="account-item">
        <div class="number">
          <p><span class="balance">0</span>元</p>
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </div>

    <list-view :listData = "orderList" class="order-list"></list-view>
    <list-view :listData = "serviceList"></list-view>
    
  </div>
</template>

<script>
import NavBar  from 'components/common/navbar/NavBar'

import UserInfo from './childComp/UserInfo'
import ListView from './childComp/ListView'
export default {
  name:'Profile',
  data() {
    return {
      orderList:[
        {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
        {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
        {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
      ],
      serviceList:[
        {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
        {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
      ]
    }
  },
  components: {
    NavBar,

    UserInfo,
    ListView
  }
}
</script>

<style scoped >
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    
  }
  .account{
    display: flex;
    text-align: center;
    border-bottom: 12px solid #eee;
  }
  .account-item{
    flex: 1;
    border-right: 1px solid #eee;
    padding: 18px;
  }
  .number p span{
    font-size: 24px;
    color: var(--color-high-text);
    font-weight: 700;
    
  }
  .account-info{
    font-size: 13px;
    margin-top: 6px;
  }
  .order-list{
    border-bottom: 12px solid #eee;
  }
</style>
