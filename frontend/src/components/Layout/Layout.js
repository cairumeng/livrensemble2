import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import DashboardNav from '../DashboardNav/DashboardNav'
import Header from '../Header/Header'

const Layout = (props) => {
  const user = useSelector((state) => state.profile.user)
  const logout = () => {
    axios.post('/auth/logout')
    localStorage.removeItem('REACT_lIVRENSENSEMBLE_TOKEN')
    window.location.href = '/'
  }

  return (
    <div>
      {user.role === 'restaurant' ? (
        <DashboardNav user={user} logout={logout} />
      ) : (
        <Header user={user} logout={logout} />
      )}
      {props.children}
    </div>
  )
}

export default Layout
