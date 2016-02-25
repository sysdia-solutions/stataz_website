import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import userReducer from '../reducers/UserReducers'
import profileReducer from '../reducers/ProfileReducers'
import listReducer from '../reducers/ListReducers'
import searchReducer from '../reducers/SearchReducers'

const loggerMiddleware = createLogger()

const middleware = [
  thunkMiddleware,
  debug_mode && loggerMiddleware
].filter(Boolean)

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

const appReducers = combineReducers({
  userReducer,
  profileReducer,
  listReducer,
  searchReducer
})

export default function configureStore(initialState) {
  return createStoreWithMiddleware(appReducers, initialState)
}
