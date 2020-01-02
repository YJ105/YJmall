<template>
  <div class="goods-item">
    <img v-lazy = "showImage" alt="" @load = "itemImgLoad" @click = "itemClick">

    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  data() {
    return {

    }
  },
  components: {

  },
  computed:{
    showImage(){
      return this.goodsItem.img || this.goodsItem.image  || this.goodsItem.show.img  
    }
  },
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    itemImgLoad(){
      this.$bus.$emit('itemImgLoad')
    },
    itemClick(){
      this.$router.push('/detail/' +  this.goodsItem.iid )
    }
  }
}
</script>

<style scoped >
  .goods-item{
    width: 48%;
    font-size: 12px;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    height: 30px;
    margin: 3px 0px ;
    position: relative;
    text-align: center;
  }
  .goods-info p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .goods-info .price{
    color: var(--color-high-text);
    /* margin-left: 50px; */
    padding-top: 10px;
  }
   .goods-info .collect {
    position: relative;
    margin-left: 20px;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

  
</style>
