import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Cart.css'
const Cart = ({
  cartPresence,
  cartItems,
  addToCartHandler,
  cartItemDeleteHandler,
}) => {
  const amount =
    cartItems.length > 0
      ? cartItems.reduce(
          (accumulator, cartItem) =>
            accumulator + cartItem.dish_quantity * cartItem.dish.price,
          0
        )
      : 0
  return (
    <div className="cart">
      <div className="cart-header">
        <span>Cart</span>
      </div>
      <div>
        {cartPresence ? (
          cartItems.map((cartItem) => (
            <div className="cart-item" key={cartItem.id}>
              <div className="cart-row">
                <span className="cart-dish-quantity">
                  {cartItem.dish_quantity}x
                </span>
                <span className="cart-dish-name">{cartItem.dish.name}</span>
                <div>
                  <button
                    className="cart-quantity-delete"
                    onClick={() => addToCartHandler(cartItem.dish, -1)}
                  >
                    -
                  </button>
                  <button
                    className="cart-quantity-add"
                    onClick={() => addToCartHandler(cartItem.dish, 1)}
                  >
                    +
                  </button>
                </div>
                <span className="cart-dish-price">
                  {cartItem.dish.price * cartItem.dish_quantity}€
                </span>
                <button
                  className="cart-dish-delete"
                  onClick={() => cartItemDeleteHandler(cartItem.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="cart-empty">
            <i className="fas fa-shopping-basket basket-icon"></i>
            <div className="mt-3 text-muted">
              Ajoutez des plats et commandez votre repas.
            </div>
          </div>
        )}
      </div>
      <div className="cart-sum">
        <div className="cart-sum-row">
          <b>Total</b>
          <span>{amount}€</span>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-3 pl-2 pr-2">
        <Button size="lg" block as={Link} to={`/checkout`}>
          Command
        </Button>
      </div>
    </div>
  )
}

export default Cart
