import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import * as Helper from '../../helper'

class PostList extends Component {

  render() {
    return (
        <ul className="post-list">
            {
              this.props.posts.map((post) => {
                return (<li key={post.id}>
                  <div className="post-header">
                    <img alt="user" src={require('../../images/cc-head.png')}/>
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                    <span className="type-tab">{post.category}</span>
                  </div>
                  <div className="post-title">{post.title}</div>
                  <div className="post-profile">{Helper.trim(post.body)}</div>
                  <span className="vote-score"><img alt="vote" src={require('../../images/love.png')}/>{post.voteScore}</span>
                  <Link to={'/posts/'+post.id} className="detail-tab"><img alt="detail" src={require('../../images/detail-icon.png')}/></Link>
                </li>)
              })
            }
          </ul>
    )
  }
}

export default PostList;
