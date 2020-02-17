import {
  GET_ALLPOSTS,
  GET_CATEGORYPOSTS,
  GET_POSTDETAIL,
} from '../actions'

const initialPostState = {
  allPosts: [],
  categoryPosts: [],
  postDetail: {}
}

function post (state = initialPostState, action) {
  const { allPosts, categoryPosts, postDetail } = action
  switch (action.type) {
    case GET_ALLPOSTS:
      return {
        ...state,
        allPosts: allPosts
      }
    case GET_CATEGORYPOSTS:
      return {
        ...state,
        categoryPosts: categoryPosts
      }
    case GET_POSTDETAIL: 
      return {
        ...state,
        postDetail: postDetail
      }
    default:
      return state
  }
}

export default post