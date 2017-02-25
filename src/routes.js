import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/app';
import BookList from './containers/book_list_container';
import BookNew from './containers/book_new_container';
import BookShow from './containers/book_show_container';
import BookEdit from './containers/book_edit_container';
import AddReview from './containers/review_new_container';
import AuthService from './utils/AuthService';
import JourneyNew from './containers/journey_new_container';
import Login from './components/log_in_component';
import Profile from './containers/profile_page_container';
import UpdateJourney from './containers/update_journey_container.js';

const auth = new AuthService('K2UDmb55IjNcvJMDyaVzTBWh9w6uCdb9', 'hyin775.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

const routes = (
  <Route path="/" component={App} auth={auth}>
    <IndexRedirect to="/books" />
    <Route path="books" component={BookList} onEnter={requireAuth} />
    <Route path="books/new" component={BookNew} />
    <Route path="books/:id" component={BookShow} />
    <Route path="books/:id/edit/:review_id" component={BookEdit} />
    <Route path="books/:id/addReview" component={AddReview} />
    <Route path="login" component={Login} />
    <Route path="journey" component={JourneyNew} onEnter={requireAuth} />
    <Route path="profile" component={Profile} onEnter={requireAuth} />
    <Route path="profile/update/:id" component={UpdateJourney}/>
  </Route>
);

export default routes;
