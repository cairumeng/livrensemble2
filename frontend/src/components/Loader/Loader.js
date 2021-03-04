import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => (
  <div className="d-flex justify-content-center align-items-center loading">
    <Spinner animation="grow" variant="primary" />
    <Spinner animation="grow" variant="secondary" />
    <Spinner animation="grow" variant="success" />
    <Spinner animation="grow" variant="danger" />
    <Spinner animation="grow" variant="warning" />
    <Spinner animation="grow" variant="info" />
    <Spinner animation="grow" variant="light" />
    <Spinner animation="grow" variant="dark" />
  </div>
)

export default Loader
