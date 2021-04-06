import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useParams } from 'react-router'
import Loader from '../../components/Loader/Loader'
import './SousCommands.scss'

const SousCommand = () => {
  const params = useParams()
  const [sousCommand, setSousCommand] = useState()
  const [dishes, setDishes] = useState()

  useEffect(() => {
    axios.get(`/restaurant/sous-commands/${params.id}`).then((response) => {
      setSousCommand(response.data.sousCommand)
      setDishes(response.data.sousCommandDishes)
    })
  }, [])

  if (!sousCommand || !dishes) {
    return <Loader />
  }

  return (
    <>
      <div id="user-info" className="text-right mr-5 mt-5">
        <img src={sousCommand.user.avatar} className="user-avatar" />
        <div>{sousCommand.user.email}</div>
        <div>{sousCommand.address.name}</div>
        <div>{sousCommand.address.address}</div>
        <div>{sousCommand.address.phone_number}</div>
      </div>
      <div>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Dish name</th>
              <th>Quantity</th>
              <th>Price(€)</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish, index) => (
              <tr key={dish.id}>
                <td>{index + 1}</td>
                <td>{dish.dish.name}</td>
                <td>{dish.dish_quantity}</td>
                <td>{dish.dish.price * dish.dish_quantity}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>
                {Object.values(dishes).reduce(
                  (sum, dish) => sum + dish.dish.price * dish.dish_quantity,
                  0
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default SousCommand
