<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{active : isActive}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>   
</template>

<script>
export default {
  name:'tabBarItem',
  data() {
    return {
      // isActive:true
    }
  },
  components: {

  },
  props:{
    path:String,
    activeColor:{
      type:String,
      default : 'red'
    }
  },
  computed:{
    isActive(){
      //颜色动态控制
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{    
    itemClick(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped >
  .tab-bar-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /* .active{
    color: deeppink;
  } */
</style>
