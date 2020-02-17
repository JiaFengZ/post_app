import {
  CHNAGE_RANKING,
  CHNAGE_COMMENT_RANKING
} from '../actions'

function ranking(state = {ranking: '评分', commentRanking:'评分'}, action) {
  const { ranking, commentRanking } = action
  switch (action.type) {
    case CHNAGE_RANKING:
      return {
        ...state,
        ranking: ranking
      }
    case CHNAGE_COMMENT_RANKING:
      return {
        ...state,
        commentRanking: commentRanking
      }
    default :
      return state
  }
}


export default ranking