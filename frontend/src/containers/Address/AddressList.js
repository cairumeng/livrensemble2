import React, { useState, useEffect } from 'react'
import { Container, Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import './AddressList.css'
const AddressList = () => {
  const [addresses, setAddresses] = useState([])
  const [defaultAddressId, setDefaultAddressId] = useState(0)
  useEffect(() => {
    axios.get('/addresses').then((response) => {
      setAddresses(response.data)
      response.data.map((address) => {
        if (address.is_default == 1) {
          setDefaultAddressId(address.id)
        }
      })
    })
  }, [])

  const changeDefaultAddressHandler = (id) => {
    setDefaultAddressId(id)
    axios
      .post(`/addresses/change-default-address`, { address_id: id })
      .then((response) => {
        if (response.data == 1) {
          return <Checkout addressId={id} />
        }
      })
  }

  return (
    <Container className="mt-5">
      <h3>Choose your delivery address</h3>
      <Button variant="primary" size="lg" className="mb-3">
        Add a new address
      </Button>
      {addresses.map((address) => (
        <Row
          className="d-flex justify-content-between mb-3 "
          key={address.id}
          onClick={() => changeDefaultAddressHandler(address.id)}
        >
          <Col md={8} className="address-box">
            <div>
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span>
                {address.address},{address.city.postal_code},{address.city.city}
              </span>
            </div>
            <div>
              <i className="fas fa-user mr-2"></i>
              <span>{address.name}</span>
            </div>
            <div>
              <i className="fas fa-phone-alt mr-2"></i>
              <span>{address.phone_number}</span>
            </div>

            {address.id == defaultAddressId && (
              <i className="fas fa-check-circle address-select"></i>
            )}
          </Col>
          <Col md={4}>
            <div className="address-buttons">
              <Button
                className="mr-2"
                onClick={() => changeDefaultAddressHandler(address.id)}
              >
                choose
              </Button>
              <Button className="mr-2">modify</Button>
              <Button className="mr-2">delete</Button>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  )
}

export default AddressList
