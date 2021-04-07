import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../../components/Loader/Loader'
import './SousCommands.scss'

const SousCommand = () => {
  const params = useParams()
  const [sousCommand, setSousCommand] = useState()
  const [dishes, setDishes] = useState()

  useEffect(() => {
    axios.get(`/restaurant/sous-commands/${params.id}`).then((response) => {
      setSousCommand(response.data.sousCommand)
      setDishes(response.data.sousCommandDishes)
    })
  }, [])

  if (!sousCommand || !dishes) {
    return <Loader />
  }

  return (
    <tr>
      <td colSpan="7">
        <div className="d-flex">
          <div className="col-md-3 text-center">
            <strong>Dish Id</strong>
          </div>
          <div className="col-md-3 text-center">
            <strong>Dish name</strong>
          </div>
          <div className="col-md-3 text-center">
            <strong>Quantity</strong>
          </div>
        </div>
        <hr></hr>
        {dishes.map((dish) => (
          <>
            <div key={dish.id} className="d-flex mt-3">
              <div className="col-md-3 text-center">{dish.id}</div>
              <div className="col-md-3 text-center">{dish.dish.name}</div>
              <div className="col-md-3 text-center">{dish.dish_quantity}</div>
            </div>
            <hr />
          </>
        ))}
        <div className="text-right mr-5">
          Total:
          <strong className="ml-3">
            {Object.values(dishes).reduce(
              (sum, dish) => sum + dish.dish.price * dish.dish_quantity,
              0
            )}{' '}
            €
          </strong>
        </div>
      </td>
    </tr>
  )
}

export default SousCommand
