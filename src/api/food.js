import axios from './axios.js'

export function getFoodCatList () {
  const path = '/v2/index_entry'
  return axios.get(path)
}

export function getShopList (latitude, longitude) {
  const path = `/shopping/restaurants`
  return axios.get(path, {
    params: {
      latitude,
      longitude
    }
  })
}