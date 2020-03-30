import React from 'react'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './routes'
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute'
import { Nav } from './components/Nav/Nav'

export const App = () => {
  const loggedIn = useSelector(state => state.common.isLoggedIn)

  return (
    <>
      <BrowserRouter>
        {loggedIn ? <Nav></Nav> : ''}
        <Switch>
          {routes.map((route, index) =>
            !route.isProtected ? (
              <Route
                key={index}
                path={route.path}
                component={() => <route.component />}
                exact={route.isExact}
              />
            ) : (
              <ProtectedRoute
                key={index}
                path={route.path}
                component={() => <route.component />}
                exact={route.isExact}
              />
            )
          )}
          <Redirect from='*' to='/404' />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
