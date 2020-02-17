import React from 'react'
import '../App.css';

export default function Header(props) {
   return (
    	<div className="App-header">
        	{props.backLink && <i onClick={props.goBack} className="nav-link"><img alt="goback" src={require('../../images/goback.png')}/></i>}
        	<span>{props.title}</span>
      	</div>
    )
}

