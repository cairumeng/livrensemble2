import Login from './containers/Login/Login'
import Layout from './components/Layout/Layout'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import axios from 'axios'
import getProfile from './redux/actions/profile'
import { useDispatch } from 'react-redux'

function App(props) {
  const dispatch = useDispatch()
  const token = localStorage.getItem('REACT_lIVRENSENSEMBLE_TOKEN')

  if (token) {
    axios.defaults.headers.common.Authorization = token
    dispatch(getProfile())
  }

  return (
    <div className="App">
      <Layout>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </div>
  )
}

export default App
