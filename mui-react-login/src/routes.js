import React from 'react'
import { Route } from 'react-router'
import LoginPage from './pages/LoginPage'
import App from './pages/App'

export default (
  <Route path='/' component={App}>
    <Route path='login' component={LoginPage}/>
  </Route>

)