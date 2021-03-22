import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader'
import './Checkout.css'
const Checkout = () => {
  const [deliveryInfo, setDeliveryInfo] = useState({})
  const [cartItems, setCartItems] = useState([])
  const [note, setNote] = useState(null)
  const history = useHistory()
  useEffect(() => {
    axios.get('/cart-items').then((response) => {
      setCartItems(response.data)

      if (response.data.length > 0) {
        axios.get('/users/delivery-info').then((response) => {
          setDeliveryInfo(response.data)
        })
      }
    })
  }, [])

  if (!deliveryInfo || !cartItems) {
    return <Loader />
  }
  const amount = cartItems.reduce(
    (accumulator, cartItem) =>
      accumulator + cartItem.dish_quantity * cartItem.dish.price,
    0
  )

  const addSousCommandHandler = () => {
    axios
      .post('/sous-commands', {
        note,
      })
      .then((response) => {
        history.push(`/command-success/${response.data.id}`)
      })
      .catch((err) => {
        toast('Command error!', {
          position: 'top-center',
          type: 'error',
          autoClose: 3000,
          closeOnClick: true,
        })
      })
  }

  return (
    <div className="col-md-8 mr-auto ml-auto">
      <Form className=" auth-form mt-5">
        <h4 className="text-center mb-4">Delivery Information</h4>
        <Form.Group controlId="formBasicPassword" className="d-flex">
          <Form.Label className="col-md-4"> Nom</Form.Label>
          <Form.Text className="col-md-8">
            <strong>{deliveryInfo.name}</strong>
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="d-flex">
          <Form.Label className="col-md-4"> Address</Form.Label>
          <Form.Text className="col-md-8">
            <strong>{deliveryInfo.address}</strong>
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="d-flex">
          <Form.Label className="col-md-4"> Phone Number</Form.Label>
          <Form.Text className="col-md-8">
            <strong>{deliveryInfo.phone_number}</strong>
          </Form.Text>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button className="mr-5" size="sm" as={Link} to="/addresses">
            Modify
          </Button>
        </div>
      </Form>
      <Table bordered hover size="sm" variant="light" className="mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Dish</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{cartItem.dish.name}</td>
              <td>{cartItem.dish_quantity}</td>
              <td>{cartItem.dish.price * cartItem.dish_quantity}€</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Total:</strong>
            </td>
            <td variant="primary">
              <strong>{amount}€</strong>
            </td>
          </tr>
        </tbody>
      </Table>
       
      <div className="cart-note">
        <textarea
          className="textarea"
          rows="4"
          placeholder="Please leave your note here! e.g. Please add more piment"
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
              
      </div>
      <div className="d-flex justify-content-end mb-5">
        <Button size="sm" onClick={addSousCommandHandler}>
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default Checkout
