import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

function Restaurant() {
  const [restaurant, setRestaurant] = useState(null)
  const history = useHistory()
  useEffect(() => {
    axios
      .get('/restaurants')
      .then((response) => {
        setRestaurant(response.data)
      })
      .catch((error) => {})
  }, [])
  if (restaurant === null) {
    return <Loader />
  }

  const restaurantModifyHandler = () => {
    history.push('/dashboard/restaurant-modify')
  }

  return (
    <Container id="Restaurant-page">
      {restaurant.id ? (
        <div className="d-flex flex-column align-items-center mt-5">
          <img className="front-image" src={restaurant.front_image} />

          <h2>{restaurant.name}</h2>
          <div>{restaurant.description}</div>

          <div className="mt-2">
            <i className="fas fa-map-marker-alt mr-2" />
            {restaurant.address}
          </div>

          <div className="mt-2">
            <i className="fas fa-phone mr-2" />
            <a
              className="text-black text-decoration-none"
              href={`tel:${restaurant.phone_number}`}
            >
              {restaurant.phone_number}
            </a>
          </div>
          <Button className="mt-2" onClick={restaurantModifyHandler}>
            Modify
          </Button>
        </div>
      ) : (
        <Container className="d-flex justify-content-center mt-5">
          <span>You haven't created your restaurant yet! </span>
          <Link to="/dashboard/restaurant-create">Create now!</Link>
        </Container>
      )}
    </Container>
  )
}

export default Restaurant
