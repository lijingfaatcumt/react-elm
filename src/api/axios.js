import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000
})

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    return response;
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  return Promise.reject(error);
});

export default instance