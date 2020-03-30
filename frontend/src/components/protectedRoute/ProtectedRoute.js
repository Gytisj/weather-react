import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ redirectTo, ...restProps }) => {
  const isAuthenticated = !!window.localStorage.getItem('x-auth')
  return isAuthenticated ? (
    <Route {...restProps} />
  ) : (
    <Redirect to={redirectTo} />
  )
}

ProtectedRoute.defaultProps = {
  redirectTo: '/login'
}
