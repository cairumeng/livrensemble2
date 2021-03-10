import React, { useState } from 'react'
import classnames from 'classnames'
import Category from './Category'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import './CategoryList.css'

const CategoryList = ({ categories, addToCartHandler }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(
    categories.length > 0 ? categories[0].id : 0
  )

  return (
    <div>
      <div className="dish-category-bar">
        {categories.map((category) => (
          <AnchorLink
            className={classnames('text-decoration-none dish-category-item', {
              active: activeCategoryId === category.id,
            })}
            onClick={() => {
              setActiveCategoryId(category.id)
            }}
            href={`#category-${category.id}`}
            offset={82}
            key={category.id}
          >
            {category.name}
          </AnchorLink>
        ))}
      </div>
      {categories.map((category) => (
        <Category
          category={category}
          key={category.id}
          addToCartHandler={addToCartHandler}
        />
      ))}
    </div>
  )
}

export default CategoryList
