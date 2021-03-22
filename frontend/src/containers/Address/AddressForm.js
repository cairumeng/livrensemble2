import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
const AddressForm = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cities, setCities] = useState([])
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    axios.get('/cities').then((response) => {
      setCities(response.data)
      console.log(response.data)
    })

    if (id) {
      axios
        .get(`addresses/${id}`)
        .then(({ data: { name, address, phone_number, city } }) => {
          setName(name)
          setAddress(address)
          setPhoneNumber(phone_number)
          setCity({
            value: city.id,
            label: `${city.city} - ${city.postal_code}`,
          })
        })
    }
  }, [])

  const addAddressHandler = (e) => {
    e.preventDefault()
    axios
      .post('/addresses', { name, address, cityId: city.value, phoneNumber })
      .then((response) => history.push('/addresses'))
  }

  const modifyAddressHandler = (e) => {
    e.preventDefault()
    axios
      .put(`/addresses/${id}`, {
        name,
        address,
        phoneNumber,
        cityId: city.value,
      })
      .then((response) => history.push('/addresses'))
  }

  return (
    <div>
      {id ? (
        <h1 className="mt-5 mb-5 text-center"> Modify the address</h1>
      ) : (
        <h1 className="mt-5 mb-5 text-center">Add a new address</h1>
      )}

      <Form className="col-md-4 mr-auto ml-auto auth-form">
        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>address</Form.Label>
          <Form.Control
            type="text"
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Select
            value={city}
            onChange={(selectedOption) => setCity(selectedOption)}
            options={cities.map((city) => ({
              value: city.id,
              label: `${city.city} - ${city.postal_code}`,
            }))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            defaultValue={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
        {id ? (
          <Button
            variant="primary"
            type="submit"
            onClick={modifyAddressHandler}
          >
            Modify
          </Button>
        ) : (
          <Button variant="primary" type="submit" onClick={addAddressHandler}>
            Create
          </Button>
        )}
      </Form>
    </div>
  )
}

export default AddressForm
