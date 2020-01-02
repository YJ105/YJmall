<template>
  <div class="toast" v-show="isShow">
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name:'Toast',
  data() {
    return {
      message:'',
      isShow : false
    }
  },
  components: {

  },
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // isShow:{
    //   type:Boolean,
    //   default:false
    // }
  },
  methods:{
    show(message,duration){
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style scoped >
  .toast{
    position:fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0, 0, 0, .75);
    padding: 8px 10px;
    transform: translate(-50%,-50%);
    /* border-radius: 9px; */
    z-index: 100;
  }
</style>
