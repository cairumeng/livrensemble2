import Login from './containers/Login/Login'
import Layout from './components/Layout/Layout'
import Index from './containers/Index/Index'
import Register from './containers/Register/Register'
import Show from './containers/Users/Show'
import City from './containers/City/City'
import Command from './containers/Command/Command'
import PasswordChange from './containers/Users/PasswordChange'
import AddressList from './containers/Address/AddressList'
import Checkout from './containers/Checkout/Checkout'
import AddressForm from './containers/Address/AddressForm'

import { ToastContainer } from 'react-toastify'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import axios from 'axios'
import getProfile from './redux/actions/profile'

import { useDispatch, useSelector } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import CommandSuccess from './containers/CommandSuccess/CommandSuccess'
import MyCommands from './containers/MyCommands/MyCommands'
import MyCommand from './containers/MyCommands/MyCommand'
import { useEffect, useState } from 'react'
import Loader from './components/Loader/Loader'
import Dashboard from './containers/Dashboard/Dashboard'
import Restaurant from './containers/Restaurant/Restaurant'
import RestaurantCreate from './containers/Restaurant/RestaurantCreate'
import Menu from './containers/Menu/Menu'
import DishCategory from './containers/DishCategory/DishCategory'
import RestaurantCommands from './containers/RestaurantCommands/RestaurantCommands'

const ProtectedRoute = ({
  component: Component,
  checkCondition,
  redirectUrl = '/login',
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) => {
      if (checkCondition) {
        return <Component {...props} />
      }
      return (
        <Redirect
          to={{
            pathname: redirectUrl,
            state: {
              from: props.location,
            },
          }}
        />
      )
    }}
  />
)

const App = () => {
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('REACT_lIVRENSENSEMBLE_TOKEN')

    if (token) {
      setLoading(true)
      axios.defaults.headers.common.Authorization = token
      dispatch(getProfile())
        .then(() => setLoading(false))
        .catch((err) => {
          localStorage.removeItem('REACT_lIVRENSENSEMBLE_TOKEN')
          setLoading(false)
        })
    }
  }, [])

  if (loading) return <Loader />

  return (
    <div className="app">
      <Router>
        <Switch>
          <Layout>
            <ProtectedRoute
              path="/dashboard/restaurant-commands"
              exact
              component={RestaurantCommands}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'restaurant'
              }
            />
            <ProtectedRoute
              path="/dashboard/restaurant-modify"
              exact
              component={RestaurantCreate}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'restaurant'
              }
            />
            <ProtectedRoute
              path="/dashboard/restaurant-create"
              exact
              component={RestaurantCreate}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'restaurant'
              }
            />
            <ProtectedRoute
              path="/dashboard"
              exact
              component={Dashboard}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'restaurant'
              }
            />
            <ProtectedRoute
              path="/dashboard/restaurants"
              exact
              component={Restaurant}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'restaurant'
              }
            />
            <ProtectedRoute
              path="/dashboard/menus"
              exact
              component={Menu}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'restaurant'
              }
            />
            <ProtectedRoute
              path="/dashboard/dish-categories"
              exact
              component={DishCategory}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'restaurant'
              }
            />
            <ProtectedRoute
              path="/my-commands/:id"
              exact
              component={MyCommand}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'client'
              }
            />
            <ProtectedRoute
              path="/my-commands"
              exact
              component={MyCommands}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'client'
              }
            />
            <ProtectedRoute
              path="/command-success/:id"
              exact
              component={CommandSuccess}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'client'
              }
            />
            <ProtectedRoute
              path="/address-form/:id"
              exact
              component={AddressForm}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'client'
              }
            />
            <ProtectedRoute
              path="/address-form"
              exact
              component={AddressForm}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'client'
              }
            />
            <ProtectedRoute
              path="/checkout"
              exact
              component={Checkout}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'client'
              }
            />
            <ProtectedRoute
              path="/addresses"
              exact
              component={AddressList}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'client'
              }
            />
            <ProtectedRoute
              path="/users/:id/password-change"
              exact
              component={PasswordChange}
              checkCondition={
                profile.isAuthenticated && profile.user.role === 'client'
              }
            />
            <ProtectedRoute
              path="/users/:id"
              exact
              component={Show}
              checkCondition={profile.isAuthenticated}
            />
            <ProtectedRoute
              path="/login"
              exact
              component={Login}
              checkCondition={!profile.isAuthenticated}
              redirectUrl={
                profile.user.role === 'restaurant' ? '/dashboard' : '/'
              }
            />
            <ProtectedRoute
              path="/register"
              exact
              component={Register}
              checkCondition={!profile.isAuthenticated}
              redirectUrl="/"
            />

            <Route path="/commands/:id" exact component={Command} />
            <Route path="/cities/:id" exact component={City} />
            <Route path="/" exact component={Index} />
          </Layout>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
