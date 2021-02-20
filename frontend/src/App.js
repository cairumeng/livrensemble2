import Login from './containers/Login/Login'
import Layout from './components/Layout/Layout'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
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
      <Login />
    </div>
  )
}

export default App
