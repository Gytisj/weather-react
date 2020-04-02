import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './routes'
import { loadFavoriteCitiesAction } from './redux/actionCreators'
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute'
import { Nav } from './components/Nav/Nav'
import { getAllCities } from './redux/api'
import { useDispatch } from 'react-redux'

export const App = () => {
  const loggedIn = useSelector(state => state.common.isLoggedIn)
  const dispatch = useDispatch()

  const favoriteCities = async () => {
    if (loggedIn) {
      const allFavoriteCities = await getAllCities()
      dispatch(loadFavoriteCitiesAction(allFavoriteCities))
    }
  }

  useEffect(() => {
    favoriteCities()
  }, [])

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
