import {
  GET_CATEGORYS
} from '../actions'

function category(state = {categories: []}, action) {
  const { categories } = action
  switch (action.type) {
    case GET_CATEGORYS:
      return {
        ...state,
        categories: categories
      }
    default :
      return state
  }
}

export default category
