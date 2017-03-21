import React from 'react';
import { Link } from 'react-router';
import { Card } from 'antd';
import { Popover } from 'antd';
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

    const detail = (
      <div>
        {(book.bookinfo.volumeInfo.authors !== undefined)
          ? (<div>by {book.bookinfo.volumeInfo.authors[0]}</div>)
          : (<div>No author</div>)}
        <div>{ ZulutoPST(book.dateadded) } added</div>
      </div>
      )

    return (
      <Card style={{ width: 117 }} bodyStyle={{ padding: 0 }} bordered={false}>
        <Popover content={detail} title={<h6>{book.title}</h6>} placement="rightTop">
          <img
              src={
              book.bookinfo.volumeInfo.imageLinks.thumbnail}
              alt="No Cover Image Available"
              styleName="book_cover"
            />
        </Popover>

        <Rating 
          placeholderRate={ book.avg_rating }
          empty={<img src='/images/star_grey.png'/>}
          placeholder={<img src='/images/star_yellow.png'/>}
          fractions = {10}
          readonly = {true}
        />
        <h6>{book.title}</h6>
      </Card>
    );
  }

  if (NoInfo) return <div>The book doesn't have book info</div>;

  if (book.bookinfo.volumeInfo.description === undefined) {
    book.bookinfo.volumeInfo.description = 'No Description';
  }

  const strippedText = book.bookinfo.volumeInfo.description.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div>
      <div styleName="center_input">
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
          <div>Average Rating: { book.avg_rating}</div>
        </div>
      </div>
      {(strippedText.length < 400) ? (<div styleName="description_box">{strippedText}</div>)
        : (<div styleName="description_box">{strippedText.slice(0, 399)}......</div>)}
    </div>
  );
};

export default  CSSModules(BookDisplay, styles);