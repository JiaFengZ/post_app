import { combineReducers } from 'redux'
import post from './postReducers'
import comment from './commentReducers'
import category from './categoryReducers'
import ranking from './rankingReducers'


export default combineReducers({
  post,
  comment,
  category,
  ranking
})