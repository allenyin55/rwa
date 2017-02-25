import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router';
import Modal from '../containers/popout_modal_container.js';
import CSSModules from 'react-css-modules';
import styles from './component.scss';

const CommentsBox = ({ comment, profile, onDeleteComment }) => {
	const PSTTime = moment.tz(comment.dateedited, 'Zulu').tz('America/Los_Angeles').format();
	const commenter = JSON.parse(comment.commenter);
	let childComments = null
	if (comment.childComments.length !== 0){
		childComments= 	<div styleName="reply_wrapper">
    				{comment.childComments.map((comment) => (
     				 <CommentsBoxWithCSS
     				 			 key={`comment/${comment.comment_id}`} 
                   comment={comment} 
                   profile={profile} 
                   onDeleteComment={onDeleteComment} />
              ))}
    </div>
        }

	return (
		<div styleName="indented_comment"
				 className="list-group-item flex-column align-items-start">
			<div className="d-flex w-100 justify-content-start">
          <img className="p-2 align-self-start" styleName="smaller_headshot" src={commenter.picture_large} />
          <div className="p-2">
            <h5 className="mb-1">{commenter.name}</h5>
            <p className="mb-1">{comment.commentcontent}</p>
            <small>edited on {PSTTime.substring(0, 10)}</small>
          </div>
          <div className="ml-auto p-2">
            {(commenter.name === profile.name) ? (
            <div styleName="delete_btn" onClick={() => onDeleteComment(comment.comment_id)}>
              Delete
            </div>
            ) : (<div></div>)}
            <Modal trigger="reply" 
            			 profile={commenter} 
            			 review_id={comment.review_id} 
            			 comment_id={comment.comment_id}/>
          </div>
        </div>
        {childComments}
      </div>)
}

const CommentsBoxWithCSS = CSSModules(CommentsBox, styles);
export default CommentsBoxWithCSS;