export function reducer (state = '', action) {
  switch(action.type) {
    case SET_GEOHASH:
      return action.data
    default:
      return state
  }
}

const SET_GEOHASH = 'set_geohash'

export const SET = geohash => ({type: SET_GEOHASH, data: geohash})