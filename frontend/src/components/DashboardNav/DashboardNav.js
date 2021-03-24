import React from 'react'
import { useState } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { AiOutlineClose } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './DashboardNav.scss'

function DashboardNav({ user, logout }) {
  const [sidebar, setSidebar] = useState(false)

  return (
    <div className=" Dashboard-nav">
      <Navbar bg="light" expand="lg">
        <FaBars
          className="cursor-pointer"
          onClick={() => setSidebar(!sidebar)}
        />
        <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
          <ul className="d-flex-column">
            <li className="sidebar-toggle mt-5 cursor-pointer">
              <AiOutlineClose onClick={() => setSidebar(!sidebar)} />
            </li>
            {SidebarData.map((item, index) => (
              <li className={item.className} key={index}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Navbar.Brand
          href="/dashboard"
          className={sidebar ? 'nav-brand-float' : 'nav-brand'}
        >
          Livrensemble Restaurant
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown
              title={<img src={user.avatar} className="profile-avatar" />}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={`/users/${user.id}`}>
                Profile center
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={`/users/${user.id}/password-change`}
              >
                Change Password
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={() => logout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default DashboardNav
