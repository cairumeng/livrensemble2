import React from 'react'
import Dish from './Dish'
import './Category.css'

const Category = ({ category }) => {
  return (
    <div>
      <h4 className="mt-4" id={`category-${category.id}`}>
        {category.name}
      </h4>
      <ul className="dish-list">
        {category.dishes.map((dish) => (
          <Dish dish={dish} key={dish.id} />
        ))}
      </ul>
    </div>
  )
}

export default Category
