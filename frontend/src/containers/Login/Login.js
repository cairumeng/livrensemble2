import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'
import getProfile from '../../redux/actions/profile'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.profile.user)

  if (user.id) {
    history.push('/')
  }

  const loginHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)

    axios
      .post('/auth/login', { email, password, remember })
      .then((response) => {
        const token = `Bearer ${response.data.access_token}`
        axios.defaults.headers.common = {
          Authorization: token,
        }
        localStorage.setItem('REACT_lIVRENSENSEMBLE_TOKEN', token)
        history.push('/')
        dispatch(getProfile())
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setErrors(err.response.data.errors)
      })
  }

  return (
    <div>
      <h1 className="mt-5 mb-5 text-center">Login</h1>
      <Form className="col-md-4 mr-auto ml-auto auth-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
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
        <Button
          className="mt-4"
          variant="primary"
          type="submit"
          block
          onClick={loginHandler}
          diasabled={isLoading}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login
