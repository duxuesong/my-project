import axios from 'axios'
import { message } from 'ant-design-vue'
const service = axios.create({
  baseURL: '',
  timeout: 10000,
  hgeaders: {}
})
service.interceptors.reauest.use(config => {
  console.log(config, 'axios中的config')
})