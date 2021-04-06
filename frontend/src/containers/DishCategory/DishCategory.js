import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader'
const DishCategory = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [categories, setCategories] = useState(null)
  const [typeAction, setTypeAction] = useState()
  const [editCategory, setEditCategory] = useState()
  const handleClose = () => setShow(false)
  const handleShow = (action, editCategory) => {
    setTypeAction(action)
    setShow(true)
    if (editCategory) {
      setEditCategory(editCategory)
      setName(editCategory.name)
    }
  }

  useEffect(() => {
    axios.get('/dish-categories').then((response) => {
      setCategories(response.data)
    })
  }, [])

  const isNameEmpty = () => {
    if (!name) {
      toast('Name could not be empty!', {
        position: 'top-center',
        type: 'error',
        autoClose: 1000,
        closeOnClick: true,
      })
      return false
    }
    return true
  }

  const createCategoryHandler = () => {
    if (isNameEmpty()) {
      axios.post('/dish-categories', { name }).then((response) => {
        setCategories([...categories, response.data])
        setName('')
        handleClose()
      })
    }
  }

  const editCategoryHandler = () => {
    if (isNameEmpty()) {
      axios
        .put(`/dish-categories/${editCategory.id}`, { name })
        .then((response) => {
          setCategories(
            categories.map((category) =>
              category.id === editCategory.id ? { ...category, name } : category
            )
          )
        })
    }
  }

  const deleteCategoryHandler = (id) => {
    axios.delete(`/dish-categories/${id}`).then((response) => {
      setCategories(categories.filter((category) => category.id !== id))
    })
  }

  if (categories === null) {
    return <Loader />
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="ml-3">
          <label className="mr-3">
            <strong>Category name: </strong>
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={
              typeAction === 'create'
                ? createCategoryHandler
                : editCategoryHandler
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <Button
          variant="primary"
          onClick={() => handleShow('create')}
          className="mt-5 ml-5"
        >
          create a new dish category
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Table striped bordered hover className="col-md-6">
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th> operations</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="text-center">
                    <AiFillEdit
                      className="mr-3 cursor-pointer"
                      onClick={() => handleShow('edit', category)}
                    />
                    <AiFillDelete
                      className="cursor-pointer"
                      onClick={() => deleteCategoryHandler(category.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default DishCategory
