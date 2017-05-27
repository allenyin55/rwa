import axios from 'axios';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const FETCH_A_BOOK = 'FETCH_A_BOOK';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const DELETE_BOOK = 'DELETE_BOOK';
export const GET_GUESSED_BOOK_INFO = 'GET_GUESSED_BOOK_INFO';
export const GET_BOOK_INFO = 'GET_BOOK_INFO';
export const CREATE_JOURNEY = 'CREATE_JOURNEY';
export const DELETE_JOURNEY = 'DELETE_JOURNEY';
export const GET_USER_BOOKS = 'GET_USER_BOOKS';
export const SELECT_BOOK = "SELECT_BOOK";
export const UPDATE_JOURNEY = "UPDATE_JOUNEY";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const GET_NOTES = "GET_NOTES";
export const CREATE_NOTE = "CREATE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const GET_WORDS = "GET_WORDS";
export const CREATE_WORD = "CREATE_WORD";
export const DELETE_WORD = "DELETE_WORD";
export const GET_WORD_DEF = "GET_WORD_DEf";
export const SEARCH_WORDS = "SEARCH_WORDS";
export const SELECT_WORD = "SELECT_WORD";
// for production const POSTGRES_SERVER_URL = 'https://readingwithannieapi.herokuapp.com/api/books';
const POSTGRES_SERVER_URL = 'https://readingwithannieapi.herokuapp.com/api/books';
const POSTGRES_SERVER_URL_JOURNEY = 'https://readingwithannieapi.herokuapp.com/api/journey';
const POSTGRES_SERVER_URL_PROFILE = 'https://readingwithannieapi.herokuapp.com/api/profile';
const POSTGRES_SERVER_URL_NOTES = 'https://readingwithannieapi.herokuapp.com/api/notes';
const POSTGRES_SERVER_URL_WORDS = 'https://readingwithannieapi.herokuapp.com/api/words';
const GOOGLE_BOOK_URL = 'https://www.googleapis.com/books/v1/volumes/';
const GOOGLE_SEARCH_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const GOOGLE_BOOK_API_KEY = 'AIzaSyCJN2MfmPezrjAR1Ji02fO-Lwtmp0Umt_c';
const OXFORD_DIC_URL = 'https://od-api.oxforddictionaries.com/api/v1/en/';
const OXFORD_APP_ID = '1b843d1e';
const OXFORD_APP_KEY = '1dcd9eb3927afb2415fc4ac331d8f2d8';


export function fetchBooks() {
  const request = axios.get(POSTGRES_SERVER_URL);

  return {
    type: FETCH_BOOKS,
    payload: request,
  };
}

export function createBook(props) {
  const request = axios.post(POSTGRES_SERVER_URL, props);

  return {
    type: CREATE_BOOK,
    payload: request,
  };
}

export function createReview(props) {
  const request = axios.post(`${POSTGRES_SERVER_URL}/${props.id}/addReview`, props);

  return {
    type: CREATE_REVIEW,
    payload: request,
  };
}

export function fetchABook(id) {
  const request = axios.get(`${POSTGRES_SERVER_URL}/${id}`);

  return {
    type: FETCH_A_BOOK,
    payload: request,
  };
}

export function editBook(props) {
  const request = axios.put(`${POSTGRES_SERVER_URL}/${props.id}`, props);

  return {
    type: EDIT_BOOK,
    payload: request,
  };
}

export function deleteReview(book) {
  const request = axios.post(`${POSTGRES_SERVER_URL}/${book.book_id}/deleteReview`, book);

  return {
    type: DELETE_REVIEW,
    payload: request,
  };
}

export function deleteBook(id) {
  const request = axios.delete(`${POSTGRES_SERVER_URL}/${id}`);

  return {
    type: DELETE_BOOK,
    payload: request,
  };
}

export function getBookInfo(selectedId) {
  const request = axios.get(`${GOOGLE_BOOK_URL}${selectedId}`);

  return {
    type: GET_BOOK_INFO,
    payload: request,
  };
}

export function getGuessedBookInfo(title) {
  const request = axios.get(`${GOOGLE_SEARCH_BOOKS_URL}${title}&key=${GOOGLE_BOOK_API_KEY}`);

  return {
    type: GET_GUESSED_BOOK_INFO,
    payload: request,
  };
}

export function createJourney(props) {
  const request = axios.post(POSTGRES_SERVER_URL_JOURNEY, props);

  return {
    type: CREATE_JOURNEY,
    payload: request,
  };
}

export function deleteJourney(book_id){
  const request = axios.delete(`${POSTGRES_SERVER_URL_JOURNEY}/${book_id}/delete`)

  return {
    type: DELETE_JOURNEY,
    payload: request
  }
}

export function getUserBooks(props) {
  const request = axios.post(POSTGRES_SERVER_URL_PROFILE, props);

  return {
    type: GET_USER_BOOKS,
    payload: request,
  };
}

export function selectBook(book){
  return{
    type: SELECT_BOOK,
    payload: book
  };
}

export function updateJourney(props){
  const request = axios.post(`${POSTGRES_SERVER_URL_JOURNEY}/${props.book_id}&${props.profile_id}`, props);

  return{
    type: UPDATE_JOURNEY,
    payload: request
  }
}

export function createComment(props){
  const request = axios.post(`${POSTGRES_SERVER_URL}/${props.review_id}/addComment`, props);

  return{
    type: CREATE_COMMENT,
    payload: request
  }
}

export function deleteComment(comment_id){
  const request = axios.post(`${POSTGRES_SERVER_URL}/deleteComment/${comment_id}`);

  return{
    type: CREATE_COMMENT,
    payload: request
  }
}

export function getComments(book_id){
  const request = axios.get(`${POSTGRES_SERVER_URL}/${book_id}/comments`);

  return{
    type: GET_COMMENTS,
    payload: request
  }
}

export function getNotes(props){
  const request = 
  axios.get(`${POSTGRES_SERVER_URL_NOTES}/${props.book_id}?profile_id=${props.profile_id}`)

  return {
    type: GET_NOTES,
    payload: request
  }
}

export function createNote(props){
  const request = axios.post(`${POSTGRES_SERVER_URL_NOTES}`, props)

  return{
    type: CREATE_NOTE,
    payload: request
  }
}

export function editNote(props){
  const request = axios.post(`${POSTGRES_SERVER_URL_NOTES}/${props.note_id}`, props)

  return{
    type: EDIT_NOTE,
    payload: request
  }
}

export function deleteNote(note_id){
  const request = axios.delete(`${POSTGRES_SERVER_URL_NOTES}/${note_id}`)

  return{
    type: DELETE_NOTE,
    payload: request
  }
}

export function getWords(props){
  const request = 
  axios.get(`${POSTGRES_SERVER_URL_WORDS}/${props.book_id}?profile_id=${props.profile_id}`)

  return {
    type: GET_WORDS,
    payload: request
  }
}

export function createWord(props){
  const request = axios.post(`${POSTGRES_SERVER_URL_WORDS}`, props)

  return{
    type: CREATE_WORD,
    payload: request
  }
}

export function deleteWord(word_id){
  const request = axios.delete(`${POSTGRES_SERVER_URL_WORDS}/${word_id}`)

  return{
    type: DELETE_WORD,
    payload: request
  }
}

export function getWordDef(word){
  const request = axios.get(`${POSTGRES_SERVER_URL_WORDS}/def/${word}`)

  return{
    type: GET_WORD_DEF,
    payload: request
  }
}

export function searchWords(word){
  const request = axios.post(`${POSTGRES_SERVER_URL_WORDS}/search`, word);

  return{
    type: SEARCH_WORDS,
    payload: request
  }
}

export function selectWord(word){
  return{
    type: SELECT_WORD,
    payload: word
  }
}