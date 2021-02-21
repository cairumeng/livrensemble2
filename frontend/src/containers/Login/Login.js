import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Login.css'
import { GET_PROFILE } from '../../redux/actionType'
import getProfile from '../../redux/actions/profile'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()

  const loginHandler = (e) => {
    e.preventDefault()

    axios
      .post('/auth/login', { email, password })
      .then((response) => {
        const token = `Bearer ${response.data.access_token}`
        axios.defaults.headers.common = {
          Authorization: token,
        }
        localStorage.setItem('REACT_lIVRENSENSEMBLE_TOKEN', token)

        dispatch(getProfile())
      })
      .catch((err) => {
        setErrors(err.response.data.errors)
      })
  }

  return (
    <Form className="col-md-6 mr-auto ml-auto">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {errors.email ? (
          <Form.Text className="text-danger">{errors.email}</Form.Text>
        ) : (
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {errors.password && (
          <Form.Text className="text-danger">{errors.password}</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="remember me"
          value={remember}
          onClick={() => setRemember(!remember)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block onClick={loginHandler}>
        Submit
      </Button>
    </Form>
  )
}

export default Login
