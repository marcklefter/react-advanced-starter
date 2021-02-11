import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  Navigation,
  NotFound,
  RouteGuard
} from './components';

import {
  Home,
  Login,
  Users
} from './pages';

// ...

export function App() {
  return (
    <Router>
      <Navigation
        links={[
          { href: '/', name: 'Home' },
          { href: '/users', name: 'Users' }
        ]}
        style={{
          marginBottom: 50
        }}
      />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <RouteGuard path="/users" component={Users} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}