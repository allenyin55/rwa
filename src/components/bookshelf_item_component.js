import React from 'react';
import ZulutoPST from '../utils/ZulutoPST.js';
import Rating from 'react-rating';
import CSSModules from 'react-css-modules';
import styles from './component.scss'

const mapReadStatus = (val) => {
    switch(val){
      case 0: return "reading"
      case 1: return "saved for later"
      case 2: return "gave up"
      case 3: return "finished "
    }
  }

const BookshelfItem = ({book}) => {

// for the sake that the book that doesn't have bookinfo or volumeinfo
  let NoInfo = false;
  if (book === null || 
      book.bookinfo === null || 
      book.bookinfo === undefined ||
      book.bookinfo.volumeInfo === undefined) {
    NoInfo = true;
  }

  // for the sake that the book doesn't have a cover image
  if (!NoInfo && book.bookinfo.volumeInfo.imageLinks === undefined){
    book.bookinfo.volumeInfo.imageLinks = ""; 
  }

 if (NoInfo) return <div>The book doesn't have book info</div>;

  const { user_stats } = book;

  return (
    <div styleName="bookshelf_item">
      <h6>{book.title}</h6>
      {(book.bookinfo.volumeInfo.authors !== undefined)
        ? (<div>by {book.bookinfo.volumeInfo.authors[0]}</div>)
        : (<div>No author</div>)}
      <div>
        <div>
          <img
            src={
            book.bookinfo.volumeInfo.imageLinks.thumbnail}
            alt="No Cover Image Available"
            styleName="book_cover"
          />
        </div>
      </div>
      <div>Started reading on { ZulutoPST(user_stats.startingDate) }</div>
      <div>Initial feelings about it:</div>
      <Rating 
        placeholderRate={ user_stats.initial_feeling }
        empty={<img src='/images/flame_empty.png'/>}
        placeholder={<img src='/images/flame_full.png'/>}
        fractions = {10}
        readonly = {true}
      />
      <div>Reading Status: { mapReadStatus(user_stats.reading_status) }</div>
    </div>
  );  
}

export default CSSModules(BookshelfItem, styles);