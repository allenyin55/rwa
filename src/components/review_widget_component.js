import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router';
import Rating from 'react-rating';
import Modal from '../containers/popout_modal_container.js';
import Commentsbox from './comments_box_component.js';
import CSSModules from 'react-css-modules';
import styles from './component.scss';

const ReviewWidget = ({ review, reviewer, profile, 
  uniqueKey, onDeleteReview, comments, onDeleteComment }) => {

  const PSTTime = moment.tz(review.dateedited, 'Zulu').tz('America/Los_Angeles').format();

  let commentsBox = null;
  let commentsToHide = [];
  comments.map((comment) => {
    comment.childComments = [];
  })
  //add child comment to parentcomment
  comments.map((childComment, index) => {
    if (childComment.parentcomment_id !== null){
      comments.map((parentcomment) => {
        if(parentcomment.comment_id === childComment.parentcomment_id){
          parentcomment.childComments.push(childComment);
          commentsToHide.push(index)
        }
      })
    }
  })
  commentsToHide.map((item) => {
    comments.splice(item, 1)
  })
  if(comments.length !== 0){ 
    commentsBox = <div>
    {comments.map((comment) => (
      <Commentsbox key={`comment/${comment.comment_id}`} 
                   comment={comment} 
                   profile={profile} 
                   onDeleteComment={onDeleteComment} />
              ))}
    </div>
  }


  return (
    <div styleName="review_item">
      <div
        styleName="review_widget"
        className="list-group-item list-group-item-action flex-column align-items-start"
        key={uniqueKey}
      >
        <div className="d-flex w-100 justify-content-start">
          <img className="p-2 align-self-start" 
               styleName="smaller_headshot" 
               src={reviewer.picture_large} />
          <div className="p-2">
            <h5 className="mb-1">{reviewer.name}</h5>
            <Rating 
              placeholderRate={ review.rating }
              empty={<img src='/images/star_grey.png'/>}
              placeholder={<img src='/images/star_yellow.png'/>}
              fractions = {10}
              readonly = {true}
            />
            <p className="mb-1">{review.review}</p>
            <small>edited on {PSTTime.substring(0, 10)}</small>
          </div>
          <div className="ml-auto p-2">
            {(reviewer.name === profile.name) ? (
            <div>
            <Link to={`${location.pathname}/edit/${uniqueKey}`}>
                Edit Review
            </Link>
            <div styleName="delete_btn" onClick={onDeleteReview}>
              Delete
            </div>
            </div>
            ) : (<div></div>)}
            <Modal trigger="comment" 
                   profile={profile} 
                   review_id={review.review_id}/>
          </div>
        </div>
      </div>
      {commentsBox}
    </div>
  );
}

export default CSSModules(ReviewWidget, styles);
