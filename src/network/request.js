import axios from 'axios'

//创建axios实例
export function request(config){
  const instance = axios.create({
    baseURL:'http://106.54.54.237:8000/api/w1',
    // baseURL:'http://123.207.32.32:8000/api/v2',
    timeout:5000
  })

  //请求拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    // console.log(err)
  })

  //响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })

  //发送真正的网络请求
  return instance(config)
}