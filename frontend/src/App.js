import Login from './containers/Login/Login'
import Layout from './components/Layout/Layout'
import Index from './containers/Index/Index'
import Register from './containers/Register/Register'
import Show from './containers/Users/Show'
import City from './containers/City/City'
import Command from './containers/Command/Command'
import PasswordChange from './containers/Users/PasswordChange'

import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import getProfile from './redux/actions/profile'
import { useDispatch } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App(props) {
  const dispatch = useDispatch()

  const token = localStorage.getItem('REACT_lIVRENSENSEMBLE_TOKEN')

  if (token) {
    axios.defaults.headers.common.Authorization = token
    dispatch(getProfile()).catch((err) => {
      localStorage.removeItem('REACT_lIVRENSENSEMBLE_TOKEN')
    })
  }

  return (
    <div className="app">
      <Router>
        <Layout>
          <Switch>
            <Route path="/commands/:id">
              <Command />
            </Route>
            <Route path="/cities/:id">
              <City />
            </Route>
            <Route path="/users/:id/password-change">
              <PasswordChange />
            </Route>
            <Route path="/users/:id">
              <Show />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Index />
            </Route>
          </Switch>
        </Layout>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
