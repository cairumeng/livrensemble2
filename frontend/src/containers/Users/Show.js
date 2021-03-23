import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Show = () => {
  const user = useSelector((state) => state.profile.user)
  const [username, setUsername] = useState(user.username)
  const [description, setDescription] = useState(user.description)
  const [email, setEmail] = useState(user.email)
  const [avatar, setAvatar] = useState(user.avatar)
  const [isModifyMode, setModifyMode] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const avatarUploader = (e) => {
    setLoading(true)
    setErrors({ ...errors, avatar: false })
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      formData.append('avatar', e.target.files[0])
      axios
        .post(`users/${user.id}/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setAvatar(response.data.path)
          setLoading(false)
        })
        .catch((errors) => {
          setErrors(errors.response.data.errors)
          setLoading(false)
        })
    }
  }

  const validateHandler = () => {
    axios
      .put(`users/${user.id}`, { username, description })
      .then((response) => {
        if (response.data === 1) {
          toast('You just update your profile!', {
            position: 'top-center',
            type: 'success',
            autoClose: 3000,
            closeOnClick: true,
          })
          setModifyMode(false)
        }
      })
      .catch((errors) => {
        setErrors(errors.response.data.errors)
      })
  }

  useEffect(() => {
    setUsername(user.username)
    setDescription(user.description)
    setAvatar(user.avatar)
    setEmail(user.email)
  }, [user.id])

  return (
    <Container className="col-md-8 mr-auto ml-auto mt-5">
      <Row>
        <Col xs={6} md={4}>
          <Form>
            <Image id="current_avatar" src={avatar} thumbnail />
            {isModifyMode && (
              <Form.File id="avatar" onChange={(e) => avatarUploader(e)}>
                {isLoading && (
                  <Button variant="defaut" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      variant="light"
                    />
                    Loading...
                  </Button>
                )}
              </Form.File>
            )}
            <Form.Text className="text-danger">{errors.avatar}</Form.Text>
            {isLoading && <div id="upload_message"></div>}
          </Form>
        </Col>
        <Col xs={6} md={4}>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                readOnly={!isModifyMode}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-danger">{errors.username}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                readOnly={!isModifyMode}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Text className="text-danger">
                {errors.description}
              </Form.Text>
            </Form.Group>
            {isModifyMode ? (
              <Button variant="primary" type="button" onClick={validateHandler}>
                Update
              </Button>
            ) : (
              <Button
                variant="primary"
                type="button"
                onClick={() => setModifyMode(true)}
              >
                Modify
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Show
