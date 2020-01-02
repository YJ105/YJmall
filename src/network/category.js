import {request } from './request'

//左边侧边栏的数据
export function getCategory(){
  return request ({
    url:'category',
  })
}

//子类别上部分数据
export function getSubcategory(maitKey){
  return request({
    url:'/subcategory',
    params:{
      maitKey
    }
  })
}

//子类别下半部分数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}