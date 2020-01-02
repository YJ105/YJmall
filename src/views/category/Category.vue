<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center" >商品分类</div></nav-bar>

    <div class="content">
      <tab-menu :categories = "categories" @selectItem= "selectItem"/>

      <scroll class="scroll">
        <!-- <div> -->
          <tab-content-category :subcategories= "showSubcategory"/>
          <tab-control :titles= "['综合','新品','销量']" class="tab-control" @tabClick = "tabClick"/>
          <tab-content-detail :categoryDetail = "showCategoryDetail"/>
        <!-- </div> -->
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
// import TabControl from 'components/content/tabcontrol/TabControl'

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import {tabControlMixin} from 'common/mixin'

import TabMenu from './childComp/TabMenu'
import TabContentCategory from './childComp/TabContentCategory'
import TabContentDetail from './childComp/TabContentDetail'

export default {
  name:'Category',
  data() {
    return {
      categories:[],
      categoryData: {},
      currentIndex: -1
    }
  },
  mixins:[tabControlMixin],

  components: {
    NavBar,
    Scroll,
    // TabControl,

    TabMenu,
    TabContentCategory,
    TabContentDetail
  },
  created(){
    this.getCategory()
    // this.getSubcategory()
  },
  computed: {
    showSubcategory(){
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },

    showCategoryDetail(){
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  
  },
  methods:{
    getCategory(){
      getCategory().then(res => {
     // console.log(res);   //左边侧边栏的数据
      //1.获取分类数据
      this.categories = res.data.category.list

      //2.初始化每个类别的子数据
      for(let i = 0; i< this.categories.length; i++){
        this.categoryData[i] = {
          subcategories :{},
          categoryDetail:{
            'pop':[],
            'new':[],
            'sell':[]
          }
        }
      }
      // this.getSubcategories(0)
      })
    },

    getSubcategories(index){     //子类别上部分数据
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        // console.log(res)
        this.categoryData[index].subcategories = res.data
        // this.categoryData = {...this.categoryData}
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
      })
    },
    
    getCategoryDetail(type){
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey,type).then(res => {
        // console.log(res)
        this.categoryData[this.currentIndex].categoryDetail[type] = res
      })
    },

    selectItem(index){
      this.getSubcategories(index)
    }
  }
}
</script>

<style scoped >
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 13;
  }
  #category{
    height: 100vh;
  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  .scroll{
    height: 100%;
    /* height: calc(100% - 49px); */
    flex: 1;
    overflow: hidden;
  }
  .tab-control{
    font-size: 15px;
  }
</style>
