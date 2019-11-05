import axios from 'axios'

const http = axios.create({
    baseURL: 'https://few.e-spy.cn/admin/api'
    // baseURL: 'http://119.29.163.198:30002/admin/api'
})

export default http