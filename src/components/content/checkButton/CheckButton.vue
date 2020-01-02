<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" alt="" :class="{check : isChecked}">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  data() {
    return {
      
    }
  },
  components: {

  },
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped >
  img{
    border: 2px solid #aaa;
    border-radius: 50%;
  }
  .check{
    background-color: var(--color-tint);
    border: 2px solid var(--color-tint);
  }
</style>
