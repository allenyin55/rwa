import { SEARCH_WORDS, SELECT_WORD } from '../actions/index';
const INITIAL_STATE = { results: [], wordSelected: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_WORDS:
      return { ...state, results: action.payload.data };
    case SELECT_WORD:
      return { ...state, wordSelected: action.payload}
    default:
      return state;
  }
}
