import {request} from './request'

//获取轮播图及推荐数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}


//获取商品数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}