import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import { AiFillDelete, AiFillEye, AiFillFileExcel } from 'react-icons/ai'
import { FaFlagCheckered } from 'react-icons/fa'
import {
  Button,
  Form,
  Modal,
  OverlayTrigger,
  Table,
  Tooltip,
} from 'react-bootstrap'
import moment from 'moment'
import Select from 'react-select'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { useHistory } from 'react-router-dom'

const ADDRESS_OPTIONS = [
  { value: 0, label: 'Public place' },
  { value: 1, label: 'Delivery home' },
]

const CommandStatus = {
  GROUPING: 0,
  CONFIRMED: 1,
  CANCEL: 2,
  DELIVERED: 3,
}
const RestaurantCommands = () => {
  const [commands, setCommands] = useState(null)
  const [show, setShow] = useState(false)
  const [cities, setCities] = useState(null)
  const [selectedCity, setSelectedCity] = useState([])
  const [deliveryPrice, setDeliveryPrice] = useState()
  const [startTime, setStartTime] = useState()
  const [closedTime, setClosedTime] = useState()
  const [deliveryTime, setDeliveryTime] = useState()
  const [address, setAddress] = useState()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const history = useHistory()

  const [selectedAddressOption, setSelectedAddressOption] = useState(
    ADDRESS_OPTIONS[1]
  )

  useEffect(() => {
    axios
      .get('/restaurant/commands')
      .then((response) => setCommands(response.data))

    axios.get('/cities').then((response) => {
      setCities(response.data)
    })
  }, [])

  const resetCreateForm = () => {
    setDeliveryPrice()
    setDeliveryTime()
    setStartTime()
    setClosedTime()
    setSelectedCity()
    setSelectedAddressOption(ADDRESS_OPTIONS[1])
  }

  const createCommandHandler = () => {
    axios
      .post('/restaurant/commands', {
        city_id: selectedCity.value,
        total_price: deliveryPrice,
        start_time: startTime.format('YYYY-MM-DD HH:mm'),
        closed_time: closedTime.format('YYYY-MM-DD HH:mm'),
        delivery_time: deliveryTime.format('YYYY-MM-DD HH:mm'),
        delivery_option: selectedAddressOption.value,
        address,
      })
      .then((response) => {
        setCommands([...commands, response.data])
        handleClose()
        resetCreateForm()
      })
  }

  const deleteCommandHandler = (id) => {
    axios.delete(`/restaurant/commands/${id}`).then(() => {
      setCommands(commands.filter((command) => command.id !== id))
    })
  }

  const exportCommandHanler = (command) => {
    axios
      .get(`/restaurant/commands/${command.id}/export-excel`, {
        responseType: 'blob',
      })
      .then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]))
        var fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute(
          'download',
          `Command#${command.id}-${command.city.city}.xlsx`
        )
        document.body.appendChild(fileLink)
        fileLink.click()
      })
  }

  const setStatusHandler = (id, status) => {
    console.log(status, id)
    axios.put(`/restaurant/commands/${id}`, { status }).then(() => {
      if (
        status === CommandStatus.CANCEL ||
        status === CommandStatus.DELIVERED
      ) {
        setCommands(commands.filter((command) => command.id !== id))
      } else {
        setCommands(
          commands.map((command) => {
            if (command.id == id) {
              return { ...command, status }
            }
            return command
          })
        )
      }
    })
  }

  if (!commands || !cities) {
    return <Loader />
  }
  return (
    <div>
      <Button className="float-right m-3" onClick={handleShow}>
        New command
      </Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th># </th>
            <th>City</th>
            <th>Current Price/Delivery Price(€)</th>
            <th>Start time</th>
            <th>Closed time</th>
            <th>Delivery time</th>
            <th>Delivery address</th>
            <th>Status</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((command) => (
            <tr key={command.id}>
              <td>
                {command.id}
                <div>
                  {command.current_price >= command.total_price && (
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-valid-command">
                          Group purchasing success!
                        </Tooltip>
                      }
                    >
                      <FaFlagCheckered className="text-success" />
                    </OverlayTrigger>
                  )}
                </div>
              </td>
              <td>{command.city.city}</td>
              <td>
                {command.current_price} / {command.total_price}
              </td>
              <td>
                {moment(command.start_time).format('MMMM Do YYYY, h:mm:ss a')}
              </td>
              <td>
                {moment(command.closed_time).format('MMMM Do YYYY, h:mm:ss a')}
              </td>
              <td>
                {moment(command.delivery_time).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </td>
              {command.delivery_option == 0 ? (
                <td>{command.address}</td>
              ) : (
                <td>送货上门</td>
              )}
              {command.status === 0 ? (
                <td>
                  Grouping
                  <div>
                    <Button
                      size="sm"
                      className="mt-3"
                      onClick={() =>
                        setStatusHandler(command.id, CommandStatus.CONFIRMED)
                      }
                    >
                      Confirm
                    </Button>{' '}
                    <Button
                      size="sm"
                      variant="light"
                      className="mt-3"
                      onClick={() =>
                        setStatusHandler(command.id, CommandStatus.CANCEL)
                      }
                    >
                      Cancel{' '}
                    </Button>
                  </div>
                </td>
              ) : (
                <td>
                  Confirmed{' '}
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() =>
                      setStatusHandler(command.id, CommandStatus.DELIVERED)
                    }
                  >
                    Delivered
                  </Button>
                </td>
              )}

              <td>
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip id="tooltip-valid-command">
                      Check all the sous commands!
                    </Tooltip>
                  }
                >
                  <AiFillEye
                    className="mr-2 cursor-pointer"
                    onClick={() =>
                      history.push(
                        `/dashboard/commands/${command.id}/sous-commands`
                      )
                    }
                  />
                </OverlayTrigger>

                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip id="tooltip-valid-command">
                      Delete this command!
                    </Tooltip>
                  }
                >
                  <AiFillDelete
                    className="mr-2 cursor-pointer"
                    onClick={() => deleteCommandHandler(command.id)}
                  />
                </OverlayTrigger>

                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip id="tooltip-valid-command">
                      Download all user commands!
                    </Tooltip>
                  }
                >
                  <AiFillFileExcel
                    className="mr-2 cursor-pointer"
                    onClick={() => exportCommandHanler(command)}
                  />
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new command</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Select
                value={selectedCity}
                onChange={(selectedOption) => setSelectedCity(selectedOption)}
                options={cities.map((city) => ({
                  value: city.id,
                  label: `${city.city} - ${city.postal_code}`,
                }))}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Delivery Price(€)</Form.Label>
              <Form.Control
                placeholder="Enter delivery price"
                onChange={(e) => setDeliveryPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Start Datetime</Form.Label>
              <Datetime
                value={startTime}
                closeOnSelect
                onChange={(value) => setStartTime(value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Closed Datetime</Form.Label>
              <Datetime
                value={closedTime}
                closeOnSelect
                onChange={(value) => setClosedTime(value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Delivery Datetime</Form.Label>
              <Datetime
                value={deliveryTime}
                closeOnSelect
                onChange={(value) => setDeliveryTime(value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Delivery Address</Form.Label>
              <Select
                value={selectedAddressOption}
                onChange={(selectedOption) =>
                  setSelectedAddressOption(selectedOption)
                }
                options={ADDRESS_OPTIONS}
              />
            </Form.Group>
            {selectedAddressOption.value === 0 && (
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Public address</Form.Label>
                <Form.Control
                  placeholder="Define your public address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createCommandHandler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RestaurantCommands
