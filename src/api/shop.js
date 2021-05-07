import axios from './axios.js'

export function getShopList (geohash, keyword) {
  const path = `/v4/restaurants`
  return axios.get(path, {
    params: {
      geohash,
      keyword
    }
  })
}