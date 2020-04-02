import * as actionTypes from '../actionTypes'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CITY_TO_FAVORITES:
      return [...state, action.city]
    case actionTypes.LOAD_FAVORITE_CITIES:
      return action.allFavoriteCities || state
    default:
      return state
  }
}
