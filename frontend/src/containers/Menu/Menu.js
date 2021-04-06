import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import DefaultDish from './default-dish.png'
import Select from 'react-select'

function Menu() {
  const [dishes, setDishes] = useState(null)
  const [categories, setCategories] = useState(null)
  const [selectedCategoryOption, setSelectedCategoryOption] = useState({})
  const [selectedDishes, setSelectedDishes] = useState()
  const [dishFormShow, setDishFormShow] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [spicyLevel, setSpicyLevel] = useState()
  const [ingredients, setIngredients] = useState()
  const [actionType, setActionType] = useState()
  const [editDish, setEditDish] = useState()
  const handleClose = () => setDishFormShow(false)
  const handleShow = () => setDishFormShow(true)

  useEffect(() => {
    axios.get('/dish-categories').then((response) => {
      setCategories(response.data)
      if (response.data.length > 0) {
        setSelectedCategoryOption({
          value: response.data[0].id,
          label: response.data[0].name,
        })
      }
    })
    axios.get('/dishes').then((response) => setDishes(response.data))
  }, [])

  useEffect(() => {
    if (!dishes) {
      return
    }
    setSelectedDishes(
      dishes.filter((dish) => dish.category_id === selectedCategoryOption.value)
    )
  }, [selectedCategoryOption.value, dishes?.length])

  if (dishes === null || categories === null) {
    return <Loader />
  }

  const selectCategoryHandler = (selectedOption) => {
    setSelectedCategoryOption(selectedOption)
  }

  const dishFormHandler = (actionType) => {
    setActionType(actionType)
    handleShow()
  }

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
        category_id: selectedCategoryOption.value,
      })
      .then((response) => {
        setDishes([...dishes, response.data])
        setDishFormShow(false)
        setDishFormInfo({})
      })
  }

  const deleteDishHandler = (id) => {
    axios
      .delete(`/dishes/${id}`)
      .then(() => setDishes(dishes.filter((dish) => dish.id !== id)))
  }

  const showEditModal = (dish) => {
    setEditDish(dish)

    dishFormHandler('edit')
    setDishFormInfo(dish)
  }

  const editDishHandler = (id) => {
    axios
      .put(`/dishes/${id}`, {
        name,
        price,
        ingredients,
        spicy_level: spicyLevel,
        image,
      })
      .then(() => {
        const updateDishes = (dishes) =>
          dishes.map((dish) =>
            dish.id === id
              ? {
                  ...dish,
                  name,
                  ingredients,
                  price,
                  spicy_level: spicyLevel,
                  image,
                }
              : dish
          )

        setDishFormShow(false)
        setSelectedDishes(updateDishes(selectedDishes))
        setDishes(updateDishes(dishes))
        setDishFormInfo({})
      })
  }

  const setDishFormInfo = (dish) => {
    setName(dish.name)
    setPrice(dish.price)
    setIngredients(dish.ingredients)
    setImage(dish.image)
    setSpicyLevel(dish.spicy_level)
  }

  return (
    <div className="mt-5 ml-5 col-md-8  ml-auto mr-auto">
      <div className="mb-5 row">
        <span className="col-md-2">
          <h5>Category:</h5>
        </span>
        <Select
          className="col-md-10"
          value={selectedCategoryOption}
          onChange={(selectedOption) => selectCategoryHandler(selectedOption)}
          placeholder="Select your dish category "
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
      </div>

      <div className="d-flex justify-content-end mb-3">
        <Button className="col-md-4" onClick={() => dishFormHandler('create')}>
          New dish
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Spicy level</th>
            <th>Ingredients</th>
            <th>operations</th>
          </tr>
        </thead>
        <tbody>
          {selectedDishes &&
            selectedDishes.map((dish, index) => (
              <tr key={dish.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={dish.image} className="dish-image" />
                </td>
                <td>{dish.name}</td>
                <td>{dish.price}</td>
                <td>{dish.spicy_level}</td>
                <td>{dish.ingredients}</td>
                <td>
                  <AiFillEdit
                    className="mr-3 cursor-pointer"
                    onClick={() => showEditModal(dish)}
                  />
                  <AiFillDelete
                    className="cursor-pointer"
                    onClick={() => deleteDishHandler(dish.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

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
              <img className="front-image" src={image || DefaultDish} />
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
