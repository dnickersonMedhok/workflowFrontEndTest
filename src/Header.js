import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/entityDesigner'>entityDesigner</Link></li>
        <li><Link to='/formDesigner'>formDesigner</Link></li>
        <li><Link to='/workflowDesigner'>workflowDesigner</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header