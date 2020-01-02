<template>
  <div id="list">
    <div v-for="(item,index) in listData"  :key= "index" class="item">
      <span class="icon">
        <svg :fill ="item.iconColor" >
          <use :xlink:href = "item.icon"></use>
        </svg>
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ListView',
  data() {
    return {

    }
  },
  components: {

  },
  props:{
    listData:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped >
  .item{
    height: 44px;
    line-height: 44px;  
    position: relative;
  }
  .icon svg{
    width: 18px;
    height: 18px; 
  }
  .item .icon{
    position: absolute;
    margin-top: 10px;
    left: 16px;
    top: -7px;
  }
  .item .info{
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
    color: #333333;
  }
  .item:last-of-type .info {
    border-bottom: none;
  }
</style>
