<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @itemClick = "itemClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll = "contentScroll" :probeType = "3">
      <detail-swiper :topImages = "topImages"></detail-swiper>
      <detail-base-info :goods = "goods"></detail-base-info>
      <detail-shop-info :shop = "shop"></detail-shop-info>
      <detail-img-info  :detailInfo = "detailInfo" @detailImgLoad = "detailImgLoad"/>
      <detail-param-info :paramInfo = "paramInfo" ref="param"/>
      <detail-comment-info :commentInfo = "commentInfo" ref="comment"/>
      <goods-list :goods = "recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart = "addCart"/>
   <back-top @click.native = "backClick" v-show="isShowBackTop"/>
   <!-- <toast :message = "message"  :isShow = "isShow"/> -->
  </div>
</template>

<script>
import {getDetail,getRecommend,Goods,Shop,GoodsParams} from 'network/detail'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import BackTop from 'components/common/backTop/BackTop'
import {itemListenerMixin, backTopMixin}  from 'common/mixin'

import DetailNavBar from './childComp/DetailNavBar'  //导航栏
import DetailSwiper  from './childComp/DetailSwiper'  //轮播图
import DetailBaseInfo  from './childComp/DetailBaseInfo' //商品信息
import DetailShopInfo from './childComp/DetailShopInfo'  //店铺信息
import DetailImgInfo from './childComp/DetailImgInfo'    //商品详细信息
import DetailParamInfo from './childComp/DetailParamInfo'  //商品参数信息
import DetailCommentInfo from './childComp/DetailCommentInfo'  //商品评论信息
import DetailBottomBar from './childComp/DetailBottomBar'    //底部工具栏
// import Toast from 'components/common/toast/Toast'

import { mapActions } from 'vuex'

export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      // itemImgListener:null,
      themeTopY:[],
      currentIndex: 0,
      // isShowBackTop : false
      // message:'',
      // isShow : false
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  components: {
    Scroll,
    GoodsList,
    // BackTop,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImgInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    // Toast
  },
  created(){
    //获取传入的iid
    this.iid = this.$route.params.iid

    //获取详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
      //1.获取数据
      const data = res.result
      //2.获取轮播图的数据
      this.topImages = data.itemInfo.topImages

      //3.获取商品信息数据
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //4.获取店铺详细数据
      this.shop = new Shop(data.shopInfo)

      //5.获取商品详细信息
      this.detailInfo = data.detailInfo

      //6.获取商品参数信息
      this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)

      //7.获取商品评论信息
      if(this.commentInfo !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })

    //获取推荐数据
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })
  },
  methods:{
    ...mapActions(['addToCart']),
    detailImgLoad(){
      this.$refs.scroll.refresh()

      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.param.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopY.push(Number.MAX_VALUE)
      console.log(this.themeTopY)
    },
    itemClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index],100)
    },

    contentScroll(position){
      //回到顶部的显示与隐藏
      this.showBackTop(position)

      const positionY = -position.y 
      // console.log(this.positionY)

    let length = this.themeTopY.length;
    for (let i = 0; i < length - 1; i++) {
      if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
        // console.log(i)
        this.currentIndex = i
        // console.log(this.currentIndex)
        this.$refs.nav.currentIndex = this.currentIndex
      }
      
    }
  },

  addCart(){
    //1.获取购物车需要展示的信息
    const product = {}
    product.image = this.topImages[0]
    product.title = this.goods.title
    product.desc = this.goods.desc
    product.price = this.goods.realPrice
    product.iid = this.iid

    //2.将商品添加到购物车
    // this.$store.commit('addToCart',product)
    // this.$store.dispatch('addToCart',product).then(res => {
    //   console.log(res)
    // })

    this.addToCart(product).then(res => {   //mapActions
      //  console.log(res)
      //   this.message = res
      //   this.isShow = true

      //   setTimeout(() => {
      //     this.message = ''
      //   this.isShow = false

      //   }, 1500);

      this.$toast.show(res,2000)
    })
  }

  // backClick(){
  //     this.$refs.scroll.scrollTo(0,0)
  //   },

    
  },
  // mounted(){
  //   const refresh = debounce(this.$refs.scroll.refresh,50)
  //   this.itemImgListener = () =>{
  //     refresh()
  //   }
  //   this.$bus.$on('itemImgLoad',this.itemImgListener)
  // },
  destroyed(){

    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
}
</script>

<style scoped >
  #detail{
    position: relative;
    z-index: 13;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .detail-navbar{
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
</style>
