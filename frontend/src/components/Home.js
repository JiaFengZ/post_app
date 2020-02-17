import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeRanking } from '../actions'
import Header from './share/Header'
import RankingChanger from './share/RankingChanger'
import PostList from './share/PostList'
import './App.css';

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.selectCateGory = this.selectCateGory.bind(this)
  }  

  selectCateGory(category) {
    if (category) {
      this.props.history.push('/' + category + '/posts')
    }
  }

  render() {
    const posts = Array.isArray(this.props.posts) ? this.props.posts.sort((() => {
        if (this.props.ranking === '评分') return (a, b) => b.voteScore - a.voteScore
        else return (a, b) => b.timestamp - a.timestamp
      })()) : []
      return (
        <div className="Home">
          <Header title="所有帖子"/>
          <header className="home-header">
            <label>排序：</label><RankingChanger value={this.props.ranking} changeRanking={this.props.changeRanking}/>
            <Link to='/add'><img className="create-btn" alt="create post" src={require('../images/Add.png')}/></Link><br/>
            <label>标签：</label>
            <span>
            {this.props.categorys.map((category) => <span className="type-tab" key={category.path} onClick={() => this.selectCateGory(category.path)}>{category.name}</span>)}
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
