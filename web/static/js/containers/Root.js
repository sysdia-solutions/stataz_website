import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from '../stores/ConfigureStore'

import Layout from '../components/Layout'
import Home from './Home'
import Profile from './Profile'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route path="/profile/:username" component={Profile} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
