import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './Restaurant.scss'
import DefaultRestaurant from './default_restaurant.png'
import { useHistory } from 'react-router'
import Loader from '../../components/Loader/Loader'

const RestaurantCreate = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [frontImage, setFrontImage] = useState()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState(null)
  const [modifyMode, setModifyMode] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    axios
      .get('/restaurants')
      .then((response) => {
        setModifyMode(true)
        setName(response.data.name)
        setEmail(response.data.email)
        setAddress(response.data.address)
        setPhoneNumber(response.data.phone_number)
        setDescription(response.data.description)
        setFrontImage(response.data.front_image)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  const createRestaurantHandler = (e) => {
    e.preventDefault()
    axios
      .post('/restaurants', {
        name,
        email,
        address,
        phoneNumber,
        description,
        frontImage,
      })
      .then((response) => console.log(response.data))
  }

  const updateRestaurantHandler = (e) => {
    e.preventDefault()

    axios
      .post('/restaurant-modify', {
        name,
        address,
        phoneNumber,
        description,
        frontImage,
      })
      .then((response) => {
        if (response.data === 1) {
          history.push('/dashboard/restaurant')
        }
      })
  }

  const frontImageUploader = (e) => {
    setLoading(true)
    setErrors({ ...errors, frontImage: false })
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      formData.append('frontImage', e.target.files[0])
      axios
        .post(`restaurants/front-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setFrontImage(response.data.path)
          setLoading(false)
        })
        .catch((errors) => {
          setErrors(errors.response.data.errors)
          setLoading(false)
        })
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div
      className="d-flex flex-column align-items-center mt-5"
      id="Restaurant-create-page"
    >
      {modifyMode ? (
        <h1>Modify your restaurant</h1>
      ) : (
        <h1>Create your restaurant</h1>
      )}

      <Form className="col-md-4 mt-5 ">
        <div className="text-center mb-3">
          <img className="front-image" src={frontImage || DefaultRestaurant} />
          <div className="mt-2">
            <input
              type="file"
              id="frontImage"
              onChange={(e) => frontImageUploader(e)}
            />
          </div>
        </div>
        <Form.Group className="mt-5">
          <Form.Label>Name</Form.Label>
          <Form.Control
            defaultValue={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            readOnly
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            row={5}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <Form.Text className="text-danger">{errors.description}</Form.Text> */}
        </Form.Group>

        <div className="d-flex justify-content-end mt-5">
          {modifyMode ? (
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => updateRestaurantHandler(e)}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => createRestaurantHandler(e)}
            >
              Create
            </Button>
          )}
        </div>
      </Form>
    </div>
  )
}

export default RestaurantCreate
