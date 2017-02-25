import { GET_USER_BOOKS } from '../actions/index';
const INITIAL_STATE = { userBooks: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_BOOKS:
      return { ...state, userBooks: action.payload.data };
    default:
      return state;
  }
}
