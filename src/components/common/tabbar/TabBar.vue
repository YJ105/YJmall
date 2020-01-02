<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar',
  data() {
    return {
      
    }
  },
  components: {
  }
}
</script>


<style scoped >
  .tab-bar{
    display: flex;
    height: 49px;
    background-color: #f6f6f6;
    box-shadow: 0px -1px 1px rgba(100, 100, 100, .2);

    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;

    z-index: 10;
  }
  
</style>
