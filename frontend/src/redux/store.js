import commonReducer from './reducers/reducer-common'
import favoriteCitiesReducer from './reducers/favoriteCities-reducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  common: commonReducer,
  favorites: favoriteCitiesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
