import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import Login from './components/Login'

import Home from './components/Home'

import NotFound from './components/NotFound'

import Jobs from './components/Jobs'

import JobDetailsItem from './components/JobDetailsItem'
import ProtectedRoute from './components/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <ProtectedRoute exact path="/Jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetailsItem} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
