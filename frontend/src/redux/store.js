import commonReducer from './reducers/reducer-common'
import clientReducer from './reducers/cart-reducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  common: commonReducer,
  client: clientReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
