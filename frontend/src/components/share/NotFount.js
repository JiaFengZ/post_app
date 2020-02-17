import '../App.css'
import React from 'react'

export default function NotFount() {
  	return (
    	  <div className="not-fount">
        	<span>对不起！你要访问的资源不存在了<img alt="not found" src={require('../../images/face.png')}/></span>
      	</div>
    )
}
