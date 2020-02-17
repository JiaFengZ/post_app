import React, { Component } from 'react'
import '../App.css';

class RankingChanger extends Component {
  constructor(props) {
    super(props)
    this.changeRanking = this.changeRanking.bind(this)
  }

  changeRanking(event) {
    this.props.changeRanking(event.target.value)
  }

  render() {
    return (
      <select className="select-input" onChange={this.changeRanking} defaultValue={this.props.value}>
        <option>评分</option><option>时间</option>
      </select>
    )
  }
}

export default RankingChanger
