import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
export const baseURL = 'http://localhost:8080'
// 创建axios实例
const instance = axios.create({
  baseURL,
  timeout: 100000, // 超时时间10s
  headers: { 'X-Custom-Header': 'foobar' },
})
const authStore = useAuthStore()
// 添加请求拦截器

instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = 'Bearer ' + authStore.token // 请求发送之前携带token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code !== 1) {
      ElMessage.error(response.data.msg)
      return
    }
    console.log(response.data)
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error)

    if (error.response.status === 401) {
      ElMessage.warning('用户未登录')
      router.push('/user')
    }
    return Promise.reject(error)
  },
)
export default instance
