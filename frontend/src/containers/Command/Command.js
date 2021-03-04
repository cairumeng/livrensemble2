import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ProgressBar,
  Row,
  Table,
} from 'react-bootstrap'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import CategoryList from './CategoryList'
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
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={command.restaurant.front_image} />
            <Card.Body>
              <Card.Title>{command.restaurant.name}</Card.Title>
              <Card.Text>{command.restaurant.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>email:</b> {command.restaurant.email}
              </ListGroupItem>
              <ListGroupItem>
                <b>address:</b> {command.restaurant.address}
              </ListGroupItem>
              <ListGroupItem>
                <b>phone number:</b>
                {command.restaurant.phone_number}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h3>Command Info</h3>
          <Table borderless hover>
            <tbody>
              <tr>
                <td>Start date</td>
                <td>{moment(command.start_time).fromNow()}</td>
              </tr>
              <tr>
                <td>Closed time</td>
                <td>
                  {moment(command.closed_time).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}
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
        </Col>
      </Row>
    </Container>
  )
}

export default Command
