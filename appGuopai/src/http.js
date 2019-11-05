import axios from 'axios'

const http = axios.create({
    baseURL: 'http://119.29.163.198:30002/JYguopai/api'
})

export default http