import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://10.234.108.197:8080',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
  }
  return config
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
