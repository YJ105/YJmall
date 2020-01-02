<template>
  <div class="base-info"  v-if="Object.keys(goods).length !== 0 ">
    <div class="base-title">{{goods.title}}</div>
    
    <div class="base-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount"
      :style="{ backgroundColor:goods.bgColor}"
      v-if="goods.discountDesc">
      {{goods.discountDesc}}</span>
    </div>

    <div class="base-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
       <!-- 5-1=4   第四个 -->
      <span>{{goods.services[goods.services.length-1].name}}</span>  
    </div>

    <div class="base-services">
      <!-- <div v-for="index in 4">{{index}}</div> -------1,2,3,4 -->
      <span class="base-services-item" v-for="index in goods.services.length -1" :key = "index"> 
        <!-- 1,2,3,4 -1 === 0,1,2,3 -->
        <img :src="goods.services[index -1].icon" alt="">
        <span>{{goods.services[index -1].name}}</span>
      </span>
    </div>


  </div>

  
</template>

<script>
export default {
  name:'DetailBaseInfo',
  data() {
    return {

    }
  },
  components: {

  },
  props:{
    goods:{
      type: Object,
      default(){
          return {}
      }
    }
  }
}
</script>

<style scoped >
  .base-info{
    margin-top: 15px;
    padding: 0px 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .base-title{
    font-size: 16px;
    color: #222;
  }
  .base-price{
    margin-top: 10px;
  }
  .n-price{
    color: var(--color-high-text);
    font-size: 24px;
  }
  .o-price{
    color:#999;
    font-size: 13px;
    text-decoration: line-through;
    margin-left: 4px;
  }
  .discount{
    color: #fff;
    font-size: 12px;
    border-radius: 8px;
    padding: 2px 3px;
    margin-left: 3px;
    padding-right: 7px;

    position: relative;
    top: -9px;
  }
  .base-other{
    font-size: 12px;
    margin-top: 10px;
    border-bottom: 2px solid #f2f5f8;
    line-height: 30px;
    display: flex;
    /* 让span元素平均分布 */
    justify-content: space-between; 
  }
  .base-services{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .base-services img{
    width: 14px;
    position: relative;
    top: 2px;
  }
  .base-services-item span {
    font-size: 12px;
    color: #333;
  }
</style>
