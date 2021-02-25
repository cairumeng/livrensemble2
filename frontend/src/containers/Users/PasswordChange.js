import axios from 'axios'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState({})
  const user = useSelector((state) => state.profile.user)
  const passwordChangeHandler = (e) => {
    e.preventDefault()
    axios
      .put(`users/${user.id}/password-change`, {
        current_password: currentPassword,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        if (response.data === 1) {
          toast('You just update your profile!', {
            position: 'top-center',
            type: 'success',
            autoClose: 3000,
            closeOnClick: true,
          })
        }
      })
      .catch((errors) => {
        console.log(errors.response)
        setErrors(errors.response.data.errors)
      })
  }
  return (
    <div>
      <h1 className="mt-5 mb-5 text-center">Password Change</h1>
      <Form className="col-md-4 mr-auto ml-auto auth-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Form.Text className="text-danger">
            {errors.current_password}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Please enter your new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-danger">{errors.password}</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Please confirm your password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={passwordChangeHandler}>
          Update
        </Button>
      </Form>
    </div>
  )
}
export default PasswordChange
