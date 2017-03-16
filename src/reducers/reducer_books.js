import { FETCH_BOOKS, FETCH_A_BOOK, GET_BOOK_INFO, GET_NOTES, GET_WORD_DEF, GET_WORDS,
         GET_GUESSED_BOOK_INFO, SELECT_BOOK, GET_COMMENTS } from '../actions/index';
import { REHYDRATE } from 'redux-persist/constants';
const ERROR_MESSAGE = "ERROR_MESSAGE";
const INITIAL_STATE = { all: [], book: null, bookInfo: [], wordDef: [], words: [],
                        bookSelected: null, comments: [], notes: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, all: action.payload.data.data };// the extra "data" at the end is because of the format of
                                                              // returning data of postgres
    case FETCH_A_BOOK:
      return { ...state, book: action.payload.data };
    case GET_BOOK_INFO:
      return { ...state, bookInfo: action.payload.data };
    case GET_GUESSED_BOOK_INFO:
        // google books return 10 items for searched term, the app will choose the
        // first one here
      if (action.payload.data.items === undefined) return state;
      return { ...state, bookInfo: action.payload.data.items[0] };
    case SELECT_BOOK:
      return {...state, bookSelected: action.payload}
    case GET_COMMENTS:
      return {...state, comments: action.payload.data.data }
    case GET_NOTES:
      return {...state, notes: action.payload.data.data}
    case GET_WORDS:
      return {...state, words: action.payload.data.data}
    case GET_WORD_DEF:
      return {...state, wordDef: (action.error) ? ERROR_MESSAGE : action.payload.data.data}
    case REHYDRATE:
      const incoming = action.payload.books;
      if (incoming === undefined) return state;
      const all = incoming.all;
      const bookInfo = incoming.bookInfo;
      const bookSelected = incoming.bookSelected;
      if (incoming) return { ...state, all, bookInfo, bookSelected };
      return state;
    default:
      return state;
  }
}
