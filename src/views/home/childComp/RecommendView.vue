<template>
  <div class="view">
    <div v-for="item in recommends" class="view-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  data() {
    return {

    }
  },
  components: {

  },
  props:{
    recommends:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped >
  .view{
    display: flex;
    text-align: center;
    font-size: 13px;
    padding: 10px 0px 20px;
    border-bottom: 8px solid #eee;
  }
  .view-item{
    flex: 1;
  }
  .view-item img{
    width: 70px;
    margin-bottom: 10px;
  }
  
</style>
