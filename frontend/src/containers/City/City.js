import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import CommandCard from './CommandCard'
import './City.css'
import Loader from '../../components/Loader/Loader'

const City = () => {
  const params = useParams()
  const [cityCommands, setCityCommands] = useState(null)
  const [city, setCity] = useState(null)

  useEffect(() => {
    axios
      .get(`/commands?cityId=${params.id}`)
      .then((response) => {
        setCityCommands(response.data.cityCommands)
        setCity(response.data.city)
      })
      .catch((err) => console.log(err))
  }, [])

  if (!cityCommands || !city) {
    return <Loader />
  }
  if (cityCommands.length === 0) {
    return <div>There is no command right in this city!</div>
  }
  return (
    <Container>
      <h1 className="m-5 text-center">{city.city}</h1>
      <Row>
        {cityCommands.map((command) => (
          <CommandCard command={command} key={command.id} />
        ))}
      </Row>
    </Container>
  )
}

export default City
