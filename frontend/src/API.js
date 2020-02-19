
import { environment } from './env'
import { auth } from './auth'
const api = environment.apiServerUrl

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': auth.apiServerUrl,
    'Authorization': `Bearer ${auth.activeJWT()}`
  }
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers: getHeaders() })
    .then(res => res.json())
    .then(data => data.categories)

export const getPostsByCategory = (category) =>
  fetch(`${api}/categories/${category}/posts`, { headers: getHeaders() })
    .then(res => res.json())
    .then(data => data.posts)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers: getHeaders() })
    .then(res => res.json())
    .then(data => data.posts)

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => res.json())

export const getPostDetail = (id) =>
  fetch(`${api}/posts/${id}`, { headers: getHeaders() })
    .then(res => res.json())
    .then(data => data.post)

export const votePost = (id, type) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: type })
  }).then(res => res.json())
  .then(data => data.post)

export const updatePost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => res.json())
  .then(data => data.post)

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers:getHeaders() })
    .then(res => res.json())
    .then(data => data.comments)

export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( comment )
  }).then(res => res.json())

export const getCommentDetail = (id) =>
  fetch(`${api}/comments/${id}`, { headers: getHeaders() })
    .then(res => res.json())
    .then(data => data.comment)

export const voteComment = (id, type) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: type })
  }).then(res => res.json())

export const updateComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( comment )
  }).then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
