import axios from './axios.js'

export function getCityList (type) {
  const path = '/v1/cities'
  return axios.get(path, {
    params: {
      type
    }
  })
}

export function getCityDetail (id) {
  const path = `/v1/cities/${id}`
  return axios.get(path)
}

export function searchPositions (id, keyword) {
  const path = '/v1/pois'
  return axios.get(path, {
    params: {
      city_id: id,
      keyword,
      type: 'search'
    }
  })
}

export function getPosition (geohash) {
  const path = `/v2/pois/${geohash}`
  return axios.get(path)
}