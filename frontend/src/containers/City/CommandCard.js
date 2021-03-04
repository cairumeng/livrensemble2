import React from 'react'
import { Card, Button } from 'react-bootstrap'
import moment from 'moment'
import './CommandCard.css'
import { useHistory } from 'react-router-dom'
const CommandCard = ({ command }) => {
  const history = useHistory()

  const showCommandHandler = () => {
    history.push(`/commands/${command.id}`)
  }
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
          <div className="mt-1">
            <Card.Text className="command-info">
              Delivery Price : <strong> {command.total_price}</strong>
            </Card.Text>
            <Card.Text className="command-info">
              Current Price : <strong> {command.current_price}</strong>
            </Card.Text>
            <Card.Text className="command-info">
              Delivery Time :
              <strong>
                {moment(command.delivery_time).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </strong>
            </Card.Text>
          </div>
          <div className="d-flex flex-row-reverse mt-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={showCommandHandler}
            >
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
export default CommandCard
