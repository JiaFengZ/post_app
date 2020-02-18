import * as API from '../API'
export const GET_ALLPOSTS = 'GET_ALLPOSTS'
export const GET_CATEGORYPOSTS = 'GET_CATEGORYPOSTS'
export const GET_POSTDETAIL = 'GET_POSTDETAIL'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORYS = 'GET_CATEGORYS'
export const CHNAGE_RANKING = 'CHNAGE_RANKING'
export const CHNAGE_COMMENT_RANKING = 'CHNAGE_COMMENT_RANKING'

function receiveCategorys(data) {
   return {
    type: GET_CATEGORYS,
    categories: data
  }
}

export function getCategories() {
  return function (dispatch) {
    return API.getCategories()
      .then(data => dispatch(receiveCategorys(data)) //接收到数据
      )
  }
}

export function changeRanking(ranking) {
   return {
    type: CHNAGE_RANKING,
    ranking: ranking
  }
}

export function changeCommentRanking(ranking) {
   return {
    type: CHNAGE_COMMENT_RANKING,
    commentRanking: ranking
  }
}

function receivePosts(data) {
  return {
    type: GET_ALLPOSTS,
    allPosts: data,
    receivedAt: Date.now()
  }
}

export function fetchAllPosts() {

  return function (dispatch) {
    //dispatch(requestPosts(subreddit)) 正在发起请求
    return API.getAllPosts()
      .then(data => data.map((item) => formatDate(item)))
      .then(data => data.filter((item) => !item.deleted))
      .then(data =>
        dispatch(receivePosts(data)) //接收到数据
      )
  }
}

function receivePostsByCategory(data) {
  return {
    type: GET_CATEGORYPOSTS,
    categoryPosts: data
  }
}

export function getPostsByCategory(category) {
  return function(dispatch) {
    return API.getPostsByCategory(category)
    .then(data => data.map((item) => formatDate(item)))
    .then(data => dispatch(receivePostsByCategory(data)))
  }
}

function receivePostDetail(data) {
  return {
    type: GET_POSTDETAIL,
    postDetail: data
  }
}

export function getPostDetail(id) {
  return function(dispatch) {
    return API.getPostDetail(id)
    .then((data) => formatDate(data))
    .then(data => dispatch(receivePostDetail(data)))
  }
}


export function upVotePost(post) {
  return function(dispatch) {
    return API.votePost(post.id, 'upVote')
    .then(data => dispatch(getPostDetail(post.id)))
    .then(() => {dispatch(fetchAllPosts());dispatch(getPostsByCategory(post.category))})
  }
}

export function downVotePost(post) {
  return function(dispatch) {
    return API.votePost(post.id, 'downVote')
    .then(data => dispatch(getPostDetail(post.id)))
    .then(() => {dispatch(fetchAllPosts());dispatch(getPostsByCategory(post.category))})
  }
}

export function addPost (post) {
  return function(dispatch) {
    return API.addPost(post)
    .then(data => {dispatch(fetchAllPosts());dispatch(getPostsByCategory(post.category))})
  }
}

export function updatePost (id, post) {
  return function(dispatch) {
    return API.updatePost(id, post)
    .then(data => dispatch(getPostDetail(id)))
    .then(data => {dispatch(fetchAllPosts());dispatch(getPostsByCategory(data.category))})
  }
}

export function deletePost (post) {
  return function(dispatch) {
    return API.deletePost(post.id)
    .then(data => {dispatch(fetchAllPosts());dispatch(getPostsByCategory(post.category))})
  }
}

export function upVoteComment(id, postId) {
  return function(dispatch) {
    return API.voteComment(id, 'upVote')
    .then(data => dispatch(getComments(postId)))
  }
}

export function downVoteComment(id, postId) {
  return function(dispatch) {
    return API.voteComment(id, 'downVote')
    .then(data => dispatch(getComments(postId)))
  }
}

function receiveComments (data) {
  return {
    type: GET_COMMENTS,
    comments: data
  }
}

export function getComments(id) {
  return function(dispatch) {
    return API.getComments(id)
    .then(data => data.map((item) => formatDate(item)))
    .then(data => dispatch(receiveComments(data)))
  }
}

export function addComment (comment) {
  return function(dispatch) {
    return API.addComment(comment)
    .then(data => dispatch(getComments(comment.postId)))
  }
}

export function updateComment (postId, commentId, comment) {
  return function(dispatch) {
    return API.updateComment(commentId, comment)
    .then(data => dispatch(getComments(postId)))
  }
}

export function deleteComment (id, parentId) {
  return function(dispatch) {
    return API.deleteComment(id)
    .then(data => dispatch(getComments(parentId)))
  }
}


function formatDate(data) {
  const time = data.update_time || data.create_time
  if (time) {
    const date = new Date(time)
    data.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
  }
  return data
}
