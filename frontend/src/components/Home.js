import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeRanking } from '../actions'
import Header from './share/Header'
import RankingChanger from './share/RankingChanger'
import PostList from './share/PostList'
import { auth } from '../auth'
import './App.css';

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.selectCateGory = this.selectCateGory.bind(this)
    this.state = {
      token: auth.token
    }
  }  

  selectCateGory(category) {
    if (category) {
      this.props.history.push('/' + category + '/posts')
    }
  }

  logout = (e) => {
    e.stopPropagation()
    e.preventDefault()
    auth.logout()
    this.setState({
      token: auth.token
    })
    window.location.hash = ''
  }

  render() {
      const posts = Array.isArray(this.props.posts) ? this.props.posts.sort((() => {
        if (this.props.ranking === 'vote score') return (a, b) => b.vote_score - a.vote_score
        else return (a, b) => b.update_time - a.update_time
      })()) : []
      const loginURL = auth.build_login_link()
      const { token } = this.state
      return (
        <div className="Home">
          {
            token ? (
              <a className='logout-link' onClick={this.logout}>Log Out</a>
            ) : (
              <a className='login-link' href={loginURL}>Log In</a>
            )
          }
          <Header title="All Posts"/>
          <header className="home-header">
            <label>rank:</label><RankingChanger value={this.props.ranking} changeRanking={this.props.changeRanking}/>
            {
              auth.can('create:post') && <Link to='/add' title='create post'>
                <img className="create-btn" alt="create post" src={require('../images/Add.png')}/>
              </Link>
            }
            
            <br/>
            <label>label:</label>
            <span>
            {this.props.categorys.map(
              (category) => <span title={`show posts of ${category.name}`} className="type-tab" key={category.path} onClick={() => this.selectCateGory(category.path)}>{category.name}</span>
            )}
            </span>
            
          </header>
        <PostList posts={posts}/>
      </div>)
  }
}

function mapStateToProps ({ ranking }) { 
  return {
    ranking: ranking.ranking
  }
}

function mapDispatchToProps (dispatch) { 
  return {
    changeRanking: (ranking) => dispatch(changeRanking(ranking)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
