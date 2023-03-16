import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: 'https://www.dnnzmusic.top/',
    timeout: 8000,
    withCredentials: true
})

service.interceptors.request.use((config) => {
    return config
},err => {
    return Promise.reject(err)
})

service.interceptors.response.use((res) => {
    return res
},err => {
    ElMessage.error('network error');
    return Promise.reject(err);
})

export default service