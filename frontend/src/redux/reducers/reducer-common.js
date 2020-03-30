import * as actionTypes from '../actionTypes'

const LoggedInInitialState = { isLoggedIn: true }

export default (state = LoggedInInitialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_LOGGED_IN:
      return { ...state, isLoggedIn: !state.isLoggedIn }
    default:
      return state
  }
}
