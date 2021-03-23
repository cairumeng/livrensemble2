import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

import './Register.css'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [recaptcha, setRecaptcha] = useState(false)
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const search = useLocation().search
  const role = new URLSearchParams(search).get('role')

  console.log(role)

  const RegisterHandler = (e) => {
    e.preventDefault()

    axios
      .post('/users', {
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      })
      .then(() => {
        toast('Sign up success!You can log in now!', {
          position: 'top-center',
          type: 'success',
          autoClose: 3000,
          closeOnClick: true,
        })
        history.push('/login')
      })
      .catch((err) => {
        setErrors(err.response.data.errors)
      })
  }

  console.log(recaptcha)
  return (
    <div>
      <h1 className="mt-5 mb-5 text-center">Register</h1>
      <Form className="col-md-4 mr-auto ml-auto auth-form">
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
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password && (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
          />
          {password !== passwordConfirmation && (
            <Form.Text className="text-danger">
              Password is not confirmed.
            </Form.Text>
          )}
        </Form.Group>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
          onChange={() => setRecaptcha(true)}
        />

        <Button
          className="mt-4"
          variant="primary"
          type="submit"
          block
          disabled={!recaptcha}
          onClick={RegisterHandler}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Register
