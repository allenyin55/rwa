import React from 'react';
import AutoSuggest from '../components/auto_suggest_component';
import { Field } from 'redux-form';

const SearchBooks = props => (
  <Field
    name="title" component={AutoSuggest} {...props}
    placeholder="Search for a book"
  />
  );

export default SearchBooks;
