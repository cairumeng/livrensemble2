import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import { AiOutlineFileAdd, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import DefaultDish from './default-dish.png'

function Menu() {
  const [dishes, setDishes] = useState(null)
  const [categories, setCategories] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedDishes, setSelectedDishes] = useState()
  const [categoryShow, setCategoryShow] = useState(false)
  const [dishFormShow, setDishFormShow] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [image, setImage] = useState(DefaultDish)
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [spicyLevel, setSpicyLevel] = useState()
  const [ingredients, setIngredients] = useState()
  const [actionType, setActionType] = useState()
  const [editDish, setEditDish] = useState()

  useEffect(() => {
    axios.get('/dish-categories').then((response) => {
      setCategories(response.data)
    })
    axios.get('/dishes').then((response) => setDishes(response.data))
  }, [])

  if (dishes === null || categories === null) {
    return <Loader />
  }

  const selectCategoryHandler = (category) => {
    setCategoryShow(true)
    setSelectedCategory(category)
    setSelectedDishes(dishes.filter((dish) => dish.category_id === category.id))
  }

  const dishFormHandler = (actionType) => {
    setActionType(actionType)
    handleShow()
  }

  const handleClose = () => setDishFormShow(false)
  const handleShow = () => setDishFormShow(true)

  const imageUploader = (e) => {
    setLoading(true)
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      axios
        .post(`dishes/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setImage(response.data.path)
          setLoading(false)
        })
        .catch((errors) => {
          console.log(errors)
          setLoading(false)
        })
    }
  }

  const addDishHandler = () => {
    axios
      .post('/dishes', {
        name,
        price,
        ingredients,
        spicy_level: spicyLevel,
        image,
        category_id: selectedCategory.id,
      })
      .then((response) => {
        setSelectedDishes([...selectedDishes, response.data])
        setDishFormShow(false)
        setCategoryShow(true)
      })
  }

  const deleteDishHandler = (id) => {
    axios
      .delete(`/dishes/${id}`)
      .then((response) =>
        setSelectedDishes(selectedDishes.filter((dish) => dish.id !== id))
      )
  }

  const showEditModal = (dish) => {
    setEditDish(dish)
    setName(dish.name)
    setPrice(dish.price)
    setIngredients(dish.ingredients)
    setImage(dish.image)
    setSpicyLevel(dish.spicy_level)
    dishFormHandler('edit')
  }

  const editDishHandler = (id) => {
    axios
      .put(`/dishes/${id}`, {
        name,
        price,
        ingredients,
        spicy_level: spicyLevel,
        image,
        category_id: selectedCategory.id,
      })
      .then((response) => {
        setDishFormShow(false)
        setSelectedDishes(
          selectedDishes.map((dish) =>
            dish.id === editDish.id
              ? { ...dish, name, ingredients, price, spicyLevel, image }
              : dish
          )
        )
      })
  }

  return (
    <div className="mt-5 ml-5 d-flex">
      <ListGroup as="ul">
        {categories.length > 0 &&
          categories.map((category, i) => (
            <ListGroup.Item
              as="li"
              key={i}
              className="cursor-pointer"
              onClick={() => selectCategoryHandler(category)}
              active={selectedCategory && selectedCategory.id === category.id}
            >
              {category.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
      {categoryShow && (
        <ListGroup as="ul">
          {selectedDishes.map((dish, i) => (
            <ListGroup.Item
              as="li"
              key={i}
              className="cursor-pointer d-flex justify-content-between"
            >
              <img src={dish.image} className="dish-image" />
              <span>{dish.name}</span>
              <div>
                <AiFillEdit
                  className="mr-3 cursor-pointer"
                  onClick={() => showEditModal(dish)}
                />
                <AiFillDelete
                  className="cursor-pointer"
                  onClick={() => deleteDishHandler(dish.id)}
                />
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item as="li" className="text-center">
            <AiOutlineFileAdd onClick={() => dishFormHandler('create')} />
          </ListGroup.Item>
        </ListGroup>
      )}

      <Modal
        show={dishFormShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === 'create' ? 'Create a new dish' : 'Edit the dish'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="text-center mb-3">
              <img className="front-image" src={image} />
              {isLoading && <div className="text-danger">is loading...</div>}
              <div className="mt-2">
                <input
                  type="file"
                  id="frontImage"
                  onChange={(e) => imageUploader(e)}
                />
              </div>
            </div>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type="text"
                placeholder="Enter dish name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Price(€)</Form.Label>
              <Form.Control
                value={price}
                type="text"
                placeholder="enter"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Spicy level</Form.Label>
              <div className="d-flex">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <Form.Check
                    type="radio"
                    label={n}
                    checked={spicyLevel === n}
                    value={n}
                    className="mr-3"
                    onChange={() => setSpicyLevel(n)}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={
              actionType === 'edit'
                ? () => editDishHandler(editDish.id)
                : addDishHandler
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Menu
