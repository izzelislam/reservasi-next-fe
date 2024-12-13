import axios from "axios"
import Cookies from 'js-cookie';
import { baseUrl } from "./constant";

const token = Cookies.get("_auth")

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

//  with credentials
api.defaults.withCredentials = true
// console.log('cookie', Cookies.get())

// set token if exist in cookies
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}


// set loading to true before request
api.interceptors.request.use((config) => {
  api.defaults.headers.common["X-XSRF-TOKEN"] = Cookies.get('XSRF-TOKEN')
  return config
})

// handle request and return success or error 
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response)
  }
)


export default api