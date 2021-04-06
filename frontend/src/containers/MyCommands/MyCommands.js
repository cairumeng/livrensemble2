import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Loader from '../../components/Loader/Loader'

const MyCommands = () => {
  const [sousCommands, setSousCommands] = useState(null)
  const history = useHistory()

  useEffect(() => {
    axios.get('/sous-commands').then((response) => {
      setSousCommands(response.data)
    })
  }, [])

  if (!sousCommands) {
    return <Loader />
  }
  if (sousCommands.length === 0) {
    return <div>no commands yet</div>
  }

  const sousCommandShowHandler = (id) => {
    history.push(`/my-commands/${id}`)
  }
  return (
    <div className="col-md-8 mr-auto ml-auto mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Command ID</th>
            <th>Restaurant</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sousCommands.map((sousCommand, index) => (
            <tr
              key={sousCommand.id}
              onClick={() => sousCommandShowHandler(sousCommand.id)}
            >
              <td>{index + 1}</td>
              <td>{sousCommand.id}</td>
              <td>{sousCommand.command.restaurant.name}</td>
              <td>{sousCommand.amount}€</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default MyCommands
