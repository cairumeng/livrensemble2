import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { AiFillEye } from 'react-icons/ai'
import Loader from '../../components/Loader/Loader'

const SousCommands = () => {
  const params = useParams()
  const [sousCommands, setSousCommands] = useState(null)
  const history = useHistory()

  useEffect(() => {
    axios
      .get(`/restaurant/commands/${params.id}/sous-commands`)
      .then((response) => {
        setSousCommands(response.data)
      })
  }, [])

  if (!sousCommands) {
    return <Loader />
  }
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Receiver</th>
            <th>Delivery Address</th>
            <th>Phone Number</th>
            <th>Amount</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {sousCommands.map((sousCommand) => (
            <tr key={sousCommand.id}>
              <td>{sousCommand.id}</td>
              <td>{sousCommand.user.username}</td>
              <td>{sousCommand.address.name}</td>
              <td>{sousCommand.address.address}</td>
              <td>{sousCommand.address.phone_number}</td>
              <td>{sousCommand.amount}</td>
              <td>
                <AiFillEye
                  className="mr-2 cursor-pointer"
                  onClick={() =>
                    history.push(`/dashboard/sous-commands/${sousCommand.id}`)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default SousCommands
