import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

const MyCommand = () => {
  const params = useParams()
  const [sousCommand, setSousCommand] = useState(null)
  useEffect(() => {
    axios.get(`/sous-commands/${params.id}`).then((response) => {
      setSousCommand(response.data)
    })
  }, [])

  if (!sousCommand) {
    return <Loader />
  }
  return (
    <div className="col-md-8 mr-auto ml-auto">
      <Table striped bordered hover size="sm" variant="light" className="mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Dish</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sousCommand.sous_command_dishes.map((sous_command_dish, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{sous_command_dish.dish.name}</td>
              <td>{sous_command_dish.dish_quantity}</td>
              <td>
                {sous_command_dish.dish.price * sous_command_dish.dish_quantity}
                €
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Total:</strong>
            </td>
            <td variant="primary">
              <strong>{sousCommand.amount}€</strong>
            </td>
          </tr>
        </tbody>
      </Table>
       
      <div className=" mb-3">
           <strong>Note:</strong> {sousCommand.note}
      </div>
      <div className="d-flex justify-content-end">
        <Button as={Link} to="/my-commands">
          Back
        </Button>
      </div>
    </div>
  )
}

export default MyCommand
