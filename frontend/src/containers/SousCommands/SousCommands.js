import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useParams } from 'react-router'
import { AiFillFileExcel } from 'react-icons/ai'
import { IoChevronDownSharp } from 'react-icons/io5'
import Loader from '../../components/Loader/Loader'
import SousCommand from './SousCommand'

const SousCommands = () => {
  const params = useParams()
  const [sousCommands, setSousCommands] = useState(null)
  const [selectedSousCommandId, setSelectedSousCommandId] = useState()
  const [dishesShow, setDishesShow] = useState(false)

  useEffect(() => {
    axios
      .get(`/restaurant/commands/${params.id}/sous-commands`)
      .then((response) => {
        setSousCommands(response.data)
      })
  }, [])

  const dishPanelHandler = (id) => {
    setDishesShow(!dishesShow)
    setSelectedSousCommandId(id)
  }

  if (!sousCommands) {
    return <Loader />
  }
  return (
    <div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Receiver</th>
            <th>Delivery Address</th>
            <th>Phone Number</th>
            <th>Amount(€)</th>
          </tr>
        </thead>
        <tbody>
          {sousCommands.map((sousCommand) => (
            <>
              <tr key={sousCommand.id}>
                <td>
                  {sousCommand.id}
                  <IoChevronDownSharp
                    className="curosr-pointer"
                    onClick={() => dishPanelHandler(sousCommand.id)}
                  />
                </td>
                <td>{sousCommand.user.username}</td>
                <td>{sousCommand.address.name}</td>
                <td>{sousCommand.address.address}</td>
                <td>{sousCommand.address.phone_number}</td>
                <td>{sousCommand.amount}</td>
              </tr>

              {dishesShow && selectedSousCommandId === sousCommand.id && (
                <SousCommand />
              )}
            </>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default SousCommands
