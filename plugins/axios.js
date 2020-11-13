import qs from "qs"
// 使用qs将请求从参数转化位字符串
export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.data = qs.stringify(config.data)
    return config;
  })
  $axios.onResponse(response => {
    return Promise.resolve(response.data)
  })
  $axios.onError(error => {
    return Promise.reject(error)
  })
}
