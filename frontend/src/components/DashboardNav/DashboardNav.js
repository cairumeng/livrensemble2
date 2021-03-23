import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'
function DashboardNav({ user, logout }) {
  return (
    <div className=" Dashboard-nav">
      <Navbar bg="light" expand="lg">
        <FaIcons.FaBars />
        <Navbar.Brand href="#home" className="ml-4">
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
                Restaurant center
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
