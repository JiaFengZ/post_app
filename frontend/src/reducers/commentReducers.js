import {
  GET_COMMENTS
} from '../actions'

const commentState = {
  comments: []
}
function comment (state = commentState, action) {
  const { comments } = action
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: comments
      }
    default :
      return state
  }
}

export default comment