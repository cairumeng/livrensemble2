import React from 'react'
import { Container, Button, Jumbotron } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
const CommandSuccess = () => {
  const params = useParams()
  return (
    <Container className="mt-5">
      <div className="col-md-8 ml-auto mr-auto">
        <h1>Thank you for your command!</h1>
        <p className="mt-3">
          Nous treat actually your command and send to you an email of
          confirmation very shortly.
        </p>
        <Jumbotron className="d-flex flex-column align-items-center mt-5 ">
          <div>
            your command number: <strong>{params.id}</strong>
          </div>

          <p>
            <Button variant="dark" size="sm" className="mt-3" as={Link} to="/">
              Continue your purchase
            </Button>
          </p>
          <p>
            <Button
              variant="light"
              size="sm"
              className="mt-3"
              as={Link}
              to="/my-commands"
            >
              Check your commands
            </Button>
          </p>
        </Jumbotron>
      </div>
    </Container>
  )
}

export default CommandSuccess
