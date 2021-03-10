import React from 'react'
import './Cart.css'
const Cart = ({ cartPresence, cartItems }) => {
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
                  <button className="cart-quantity-delete">-</button>
                  <button className="cart-quantity-add">+</button>
                  <button className="cart-dish-note">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </div>
                <span className="cart-dish-price">{cartItem.dish.price}€</span>
                <button
                  className="cart-dish-delete"
                  //   onClick={(e) => cartItemDeleteHandler(e, cartItem.id)}
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
          <span>
            {Object.values(cartItems).reduce(
              (accumulator, cartItem) =>
                accumulator + cartItem.dish_quantity * cartItem.dish.price,
              0
            )}
            €
          </span>
        </div>
      </div>
    </div>
  )
}

export default Cart
