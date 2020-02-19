import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { getCategories, getPostsByCategory, fetchAllPosts, getPostDetail, addPost, updatePost } from '../actions'
import HomePage from './Home'
import PostCategory from './PostCategory'
import PostDetail from './PostDetail'
import PostEdit from './PostEdit' 
import NotFount from './share/NotFount'

class App extends Component {

  componentDidMount() {
    const { fetchAllPosts, getCategories } = this.props
    fetchAllPosts()
    getCategories()
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
              <Route exact path='/' render={() => <Redirect to="/web"/>} />
              <Route exact path='/web' render={(props) => <HomePage history={props.history} categorys={this.props.category.categories} posts={this.props.post.allPosts}/>} />
              <Route path='/web/:category/posts' render={(props) => <PostCategory match={props.match} goBack={props.history.goBack} getPosts={this.props.getPostsByCategory} posts={this.props.post.categoryPosts}/>} />
              <Route path='/web/detail/:id' render={(props) => <PostDetail match={props.match} history={props.history}/>}/>
              <Route path='/web/edit/:id' render={(props) => <PostEdit match={props.match} updatePost = {this.props.updatePost}
                 goBack={props.history.goBack} post={this.props.post.postDetail}  getDetail={this.props.getPostDetail}/>}/>
              <Route path='/web/add' render={(props) => <PostEdit match={props.match} addPost = {this.props.addPost}
                goBack={props.history.goBack} categorys={this.props.category.categories}/>}/>
              <Route path='/notfound' component={NotFount}/>
          </Switch>
        </BrowserRouter>
    )
  }
}

function mapStateToProps ({ post, category }) { // state = {post: {}, category: {}}
  return {
    post: post,
    category: category
  }
}

function mapDispatchToProps (dispatch) {  //注册派发action的事件
  return {
    getCategories: () => dispatch(getCategories()),
    getPostDetail: (id) => dispatch(getPostDetail(id)),
    addPost: (data) => dispatch(addPost(data)),
    updatePost: (id, data) => dispatch(updatePost(id, data)),
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
