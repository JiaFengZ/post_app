import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeRanking } from '../actions'
import Header from './share/Header'
import PostList from './share/PostList'
import RankingChanger from './share/RankingChanger'
import './App.css';

class PostCategory extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.match.params.category)
  }

  render() {
    const posts = Array.isArray(this.props.posts) ? this.props.posts.sort((() => {
        if (this.props.ranking === 'vote score') return (a, b) => b.voteScore - a.voteScore
        else return (a, b) => b.timestamp - a.timestamp
      })()) : []
    return (
      <div className="category-container">
          <Header title={this.props.match.params.category} backLink={true} goBack={this.props.goBack}/>
          <div className="home-header"> 
            <label>rank:</label><RankingChanger value={this.props.ranking} changeRanking={this.props.changeRanking}/>            
          </div>
          <PostList posts={posts}/>
        </div>
    );
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
)(PostCategory)
