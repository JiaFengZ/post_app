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
        <option>vote score</option><option>time</option>
      </select>
    )
  }
}

export default RankingChanger
