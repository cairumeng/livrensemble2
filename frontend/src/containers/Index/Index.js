import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import './Index.css'
const Index = () => {
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const history = useHistory()
  useEffect(() => {
    axios
      .get('/cities')
      .then((response) => {
        setCities(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const selectCityHandler = (selectedOption) => {
    setSelectedCity(selectedOption)
  }

  const getCommandsHandler = () => {
    history.push(`/cities/${selectedCity.value}`)
  }

  return (
    <div className="d-flex justify-content-center align-items-center city-search-bar">
      <Select
        value={selectedCity}
        onChange={selectCityHandler}
        options={cities.map((city) => ({
          value: city.id,
          label: `${city.city} - ${city.postal_code}`,
        }))}
        className="col-md-4"
      />
      <Button variant="primary" onClick={getCommandsHandler}>
        Command Now!
      </Button>
    </div>
  )
}

export default Index
