import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

function DashboardNav({ user, logout, sidebar, setSidebar }) {
  return (
    <div className=" Dashboard-nav">
      <Navbar bg="light" expand="lg">
        <FaBars
          className="cursor-pointer"
          onClick={() => setSidebar(!sidebar)}
        />
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
