import axios from 'axios'
import React from 'react'
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = (props) => {
  const user = useSelector((state) => state.profile.user)
  const logout = () => {
    axios.post('/auth/logout')
    localStorage.removeItem('REACT_lIVRENSENSEMBLE_TOKEN')
    window.location.href = '/'
  }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Livrensemble</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Nav>
        {user.id ? (
          <Nav>
            <NavDropdown
              title={<img src={user.avatar} className="profile-avatar" />}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={`/users/${user.id}`}>
                Profile Center
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={`/users/${user.id}/password-change`}
              >
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={'/addresses'}>
                manage addresses
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={() => logout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
