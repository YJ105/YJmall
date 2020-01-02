<template>
  <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImgLoad" >
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:'HomeSwiper',
  data() {
    return {
      isLoad : true
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    //让图片加载一次即可
    swiperImgLoad(){
      if(this.isLoad){
        this.$emit('swiperImgLoad')
        this.isLoad = false
      }
    }
  },
}
</script>

<style scoped >
</style>
