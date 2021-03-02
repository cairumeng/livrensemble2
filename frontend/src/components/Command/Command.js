import React from 'react'
import { Card, Button } from 'react-bootstrap'
import moment from 'moment'
import './Command.css'
const Command = ({ command }) => {
  return (
    <div className="col-md-3 mb-3">
      <Card>
        <Card.Img
          variant="top"
          src={command.restaurant.front_image}
          className="restaurant-image mr-auto ml-auto"
        />
        <Card.Body>
          <Card.Title className="restaurant-text">
            {command.restaurant.name}
          </Card.Title>
          <Card.Text className="restaurant-text">
            {command.restaurant.description}
          </Card.Text>
          <div className="d-flex flex-row-reverse">
            <Button variant="outline-primary" size="sm">
              <i class="fas fa-utensils"></i>
            </Button>
          </div>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            This command closed
            <strong> {moment(command.closed_time).fromNow()}</strong>
          </small>
        </Card.Footer>
      </Card>
    </div>
  )
}
export default Command
