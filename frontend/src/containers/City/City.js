import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import CommandCard from './CommandCard'
import './City.css'
import Loader from '../../components/Loader/Loader'

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
    return <Loader />
  }
  return (
    <Container>
      <h1>{cityCommands.city}</h1>
      <Row>
        {cityCommands.commands.map((command) => (
          <CommandCard command={command} key={command.id} />
        ))}
      </Row>
    </Container>
  )
}

export default City
