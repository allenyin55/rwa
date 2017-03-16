import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ProfileReducer from './reducer_profile';
import WordsReducer from './reducer_words.js';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  books: BooksReducer,
  profile: ProfileReducer,
  words: WordsReducer,
  form: formReducer,
});

export default rootReducer;
