import React, { Component } from 'react'
import Header from './share/Header'
import CategorySelect from './share/CategorySelect'
import './App.css'
import * as Helper from '../helper'

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.selectCateGory = this.selectCateGory.bind(this)
  }

  state = {
    post: this.props.match.params.id ? this.props.post : {},
    isAdd: !this.props.match.params.id
  }

  componentDidMount() {
    if (!this.state.post.id && !this.state.isAdd) {
      this.props.getDetail(this.props.match.params.id).then((res) => {
        this.input.value = res.postDetail.title
        this.textarea.value = res.postDetail.body
      })
    }
  }

  categorySelect = "react"
  selectCateGory(category) {
    this.categorySelect = category
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.match.params.id) {
      this.props.updatePost(this.props.match.params.id, {
        title: Helper.htmlEncode(this.input.value),
        body: Helper.htmlEncode(this.textarea.value)
      }).then(() => {
        this.props.goBack();
      })
    } else {
      this.props.addPost({
        title: Helper.htmlEncode(this.input.value),
        body: Helper.htmlEncode(this.textarea.value),
        id: new Date().getTime(),
        timestamp: new Date().getTime(),
        author: Helper.htmlEncode(this.authorInput.value),
        category: this.categorySelect
      }).then(() => {
        this.props.goBack();
      })
    }
  }

  render() {
    return (
    	<div>
    		<Header title="编辑帖子" backLink={true} goBack={this.props.goBack}/>    	
	    	<form className="post-edit" onSubmit={this.handleSubmit}>
	    		{this.state.isAdd&&(<p><label>作者：</label><input required name="author" type="text" ref={(input) => this.authorInput = input}/></p>)}
          {this.state.isAdd&&(<p><label>标签：</label><CategorySelect defaultValue="react" categorys={this.props.categorys} selectCateGory={this.selectCateGory}/></p>)}
          <p><label>标题：</label><input required name="title" type="text" defaultValue={this.state.post.title} ref={(input) => this.input = input}/></p>
	    		<p><label>正文：</label><textarea required title="body" row="4"defaultValue={this.state.post.body} ref={(textarea) => this.textarea = textarea}></textarea></p>
	    		<button className="submit-btn" type="submit">确定</button>
          <button className="cancel-btn" onClick={(e) => {e.preventDefault();this.props.goBack()}}>取消</button>
	    	</form>
    	</div>
    )
  }
}

export default PostEdit;
