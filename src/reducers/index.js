import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ProfileReducer from './reducer_profile';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  books: BooksReducer,
  profile: ProfileReducer,
  form: formReducer,
});

export default rootReducer;
