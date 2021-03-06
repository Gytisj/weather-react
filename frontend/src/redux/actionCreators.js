import * as actionTypes from './actionTypes'

export const IfLoggedInAction = checkIfLoggedIn => ({
  type: actionTypes.TOGGLE_LOGGED_IN,
  checkIfLoggedIn
})

export const IfLoggedOutAction = checkIfLoggedOut => ({
  type: actionTypes.TOGGLE_LOGGED_OUT,
  checkIfLoggedOut
})
