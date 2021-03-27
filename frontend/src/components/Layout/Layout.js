import axios from 'axios'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardNav from '../DashboardNav/DashboardNav'
import Sidebar from '../DashboardNav/Sidebar'
import Header from '../Header/Header'
import './Layout.css'
const Layout = (props) => {
  const user = useSelector((state) => state.profile.user)
  const [sidebar, setSidebar] = useState(false)

  const logout = () => {
    axios.post('/auth/logout')
    localStorage.removeItem('REACT_lIVRENSENSEMBLE_TOKEN')
    window.location.href = '/'
  }

  return (
    <div>
      {user.role === 'restaurant' ? (
        <>
          <DashboardNav
            user={user}
            logout={logout}
            sidebar={sidebar}
            setSidebar={setSidebar}
          />
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </>
      ) : (
        <Header user={user} logout={logout} />
      )}
      <div
        className={classNames({
          'sidebar-content': sidebar,
        })}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Layout
