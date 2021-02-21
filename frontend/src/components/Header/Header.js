import React from 'react'
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  NavDropdown,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './Header.css'

const Header = (props) => {
  const user = useSelector((state) => state.profile.user)
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
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header