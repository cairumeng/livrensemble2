import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner, CardDeck, Container, Row } from 'react-bootstrap'
import Command from '../../components/Command/Command'
import './City.css'
const City = () => {
  const params = useParams()
  const [cityCommands, setCityCommands] = useState({})

  useEffect(() => {
    axios
      .get(`/cities/${params.id}`)
      .then((response) => {
        console.log(1111, response.data)
        setCityCommands(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  if (!cityCommands.id) {
    return (
      <div className="d-flex justify-content-center align-items-center loading">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </div>
    )
  } else {
    return (
      <Container>
        <h1>{cityCommands.city}</h1>
        <Row>
          {cityCommands.commands.map((command) => (
            <Command command={command} key={command.id} />
          ))}
        </Row>
      </Container>
    )
  }
}

export default City
