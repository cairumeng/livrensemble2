import React from 'react'
import DashbordNav from '../DashbordNav/DashbordNav'

function DashbordLayout(props) {
  return (
    <div>
      <DashbordNav>{props.children}</DashbordNav>
    </div>
  )
}

export default DashbordLayout
