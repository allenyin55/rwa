import React from 'react';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import Rating from 'react-rating';
import ZulutoPST from '../utils/ZulutoPST.js';
import CSSModules from 'react-css-modules';
import styles from './component.scss'

const BookDisplay = ({ book, isInList }) => {

 // for the sake that the book that doesn't have bookinfo or volumeinfo
  let NoInfo = false;
  if (book === null || book.bookinfo === null || book.bookinfo.volumeInfo === undefined) {
    NoInfo = true;
  }

  // for the sake that the book doesn't have a cover image
  if (!NoInfo && book.bookinfo.volumeInfo.imageLinks === undefined){
    book.bookinfo.volumeInfo.imageLinks = ""; 
  }


  if (isInList) {
    if (NoInfo) {
      return (
        <div>
          {book.title}
        </div>);
    }

    return (
      <div>
        <div>
          <div>
            <img
              src={
              book.bookinfo.volumeInfo.imageLinks.thumbnail}
              alt="No Cover Image Available"
              styleName="book_cover"
            />
          </div>
          <div>
            {book.title}
          </div>
        </div>
        {(book.bookinfo.volumeInfo.authors !== undefined)
          ? (<div>{book.bookinfo.volumeInfo.authors[0]}</div>)
          : (<div>No author</div>)}
        <Rating 
          placeholderRate={ book.avg_rating }
          empty={<img src='/images/star_grey.png'/>}
          placeholder={<img src='/images/star_yellow.png'/>}
          fractions = {10}
          readonly = {true}
        />
        <div>{ ZulutoPST(book.dateadded) } added</div>
      </div>
    );
  }

  if (NoInfo) return <div>The book doesn't have book info</div>;

  if (book.bookinfo.volumeInfo.description === undefined) {
    book.bookinfo.volumeInfo.description = 'No Description';
  }

  return (
    <div>
      <h3>{book.title}</h3>
      {(book.bookinfo.volumeInfo.authors !== undefined)
        ? (<div>by {book.bookinfo.volumeInfo.authors[0]}</div>)
        : (<div>No author</div>)}
      <div>
        <div>
          <img
            src={
            book.bookinfo.volumeInfo.imageLinks.thumbnail}
            alt="No Cover Image available"
            styleName="big_book_cover"
          />
        </div>
        <Rating 
          placeholderRate={ book.avg_rating }
          empty={<img src='/images/star_grey.png'/>}
          placeholder={<img src='/images/star_yellow.png'/>}
          fractions = {10}
          readonly = {true}
        />
      </div>
      {(book.bookinfo.volumeInfo.description.length < 400) ? (<p>{book.bookinfo.volumeInfo.description}</p>)
        : (<p>{book.bookinfo.volumeInfo.description.slice(0, 399)}......</p>)}
    </div>
  );
};

export default  CSSModules(BookDisplay, styles);