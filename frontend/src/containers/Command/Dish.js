import React from 'react'

import './Dish.css'
const Dish = ({ dish, addToCartHandler }) => {
  return (
    <li className="dish-item" key={dish.id}>
      <div className="d-flex">
        <div className="dish-image mr-4">
          <div
            className="image"
            style={{ backgroundImage: `url(${dish.image})` }}
          ></div>
        </div>
        <div className="dish-description">
          <p className="dish-name">{dish.name}</p>
          <p className="dish-ingredients">{dish.ingredients}</p>
          <p>{dish.price} euros</p>
        </div>
      </div>

      <button
        className="add-cart btn btn-link"
        onClick={(e) => addToCartHandler(e, dish)}
      >
        <i className="fas fa-cart-plus"></i>
      </button>
    </li>
  )
}

export default Dish
