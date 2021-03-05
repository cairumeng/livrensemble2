import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, ProgressBar, Table } from 'react-bootstrap'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import CategoryList from './CategoryList'
import './Command.css'

const Command = () => {
  const params = useParams()
  const [command, setCommand] = useState(null)

  useEffect(() => {
    axios.get(`/commands/${params.id}`).then((response) => {
      setCommand(response.data)
    })
  }, [])

  if (!command) {
    return <Loader />
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex restaurant-header align-items-center">
          <img src={command.restaurant.front_image} />

          <div className="ml-3">
            <h2>{command.restaurant.name}</h2>
            <div>{command.restaurant.description}</div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end justify-content-center">
          <div>
            <i className="fas fa-map-marker-alt mr-2" />
            {command.restaurant.address}
          </div>

          <div>
            <i className="fas fa-phone mr-2" />
            <a
              className="text-black text-decoration-none"
              href={`tel:${command.restaurant.phone_number}`}
            >
              {command.restaurant.phone_number}
            </a>
          </div>
        </div>
      </div>
      <div className="border-top mt-3">
        <Table borderless hover>
          <tbody>
            <tr>
              <td>Start date</td>
              <td>{moment(command.start_time).fromNow()}</td>
            </tr>
            <tr>
              <td>Closed time</td>
              <td>
                {moment(command.closed_time).format('MMMM Do YYYY, h:mm:ss a')}
              </td>
            </tr>
            <tr>
              <td>Delviery time</td>
              <td>
                {moment(command.delivery_time).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </td>
            </tr>
            <tr>
              <td>Delivery price</td>
              <td> {command.total_price}€</td>
            </tr>
            <tr>
              <td>Process of delivery</td>
              <td>
                <ProgressBar
                  now={(command.current_price / command.total_price) * 100}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <CategoryList categories={command.restaurant.categories} />
      </div>
    </Container>
  )
}

export default Command
