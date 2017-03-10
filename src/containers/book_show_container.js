import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchABook, deleteBook, deleteReview, getComments, deleteComment } from '../actions/index';
import { Link } from 'react-router';
import { Modal } from 'antd';
//use to show confirm dialog
const confirm = Modal.confirm;
import BookDisplay from '../components/book_display_component';
import ReviewWidget from '../components/review_widget_component';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

class BookShow extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props){
      super(props);
      this.props.fetchABook(this.props.params.id);
      this.props.getComments(this.props.params.id);
    }

    onDeleteBookClick(){
        if(confirm('Are you sure you want delete the whole book?')) {
            this.props.deleteBook(this.props.params.id)
            .then(() => {this.context.router.push('/');});
        }
    }

    onDeleteReviewClick(review_id){
       const book = {
           book_id: this.props.params.id,
           review_id: review_id
       };
       const self = this;
       confirm({
        title: 'Are you sure you want to delete this review?',
        content: 'This will delete your review',
        okText: 'OK',
        cancelText: 'Cancel',
        onOk() {
           self.props.deleteReview(book)
                .then(() => {window.location.reload()});
        },
        onCancel() {},
      });
    }

    onDeleteCommentClick(comment_id){
      const self = this;
       confirm({
        title: 'Are you sure you want to delete this comment?',
        content: 'This will delete your comment',
        okText: 'OK',
        cancelText: 'Cancel',
        onOk() {
           self.props.deleteComment(comment_id)
          .then(() => window.location.reload())
        },
        onCancel() {},
      });
    }

    matchComments(review_id, comments){
      let matchedComments = [];
      comments.map((comment) => {
        //mutation only matters to state
        if (comment.review_id === review_id) matchedComments.push(comment)
      })
      return matchedComments
    }

    renderReview() {
        const {reviews} = this.props.bookObject;
        const { comments } = this.props;
        const {profile} = this.props;
        return reviews.map((review) => {
            const matchedComments = this.matchComments(review.review_id, comments);
            const uniqueKey = review.review_id; // a unique key for the li elements
            const reviewer = JSON.parse(review.reviewer);

            return <ReviewWidget key={uniqueKey}
                                 uniqueKey={uniqueKey}
                                 review={review}
                                 reviewer={reviewer}
                                 profile={profile}
                                 comments={matchedComments}
                                 onDeleteReview={this.onDeleteReviewClick.bind(this, uniqueKey)}
                                 onDeleteComment={this.onDeleteCommentClick.bind(this)}/>;
        })
    }

    render(){

        if(!this.props.bookObject){
            return <div>Loading...</div>
        }

        const { book } = this.props.bookObject;
        
        if(this.props.bookObject.reviews.length==0){
            return(
                <div className="d-flex justify-content-between">
                    <BookDisplay book={book} isInList={false}/>
                    <div className="d-flex flex-column">
                        {/* hide the delete book from the users
                        <button
                          className="btn btn-danger"
                          styleName="btn"
                          onClick={this.onDeleteBookClick.bind(this)}>
                            Delete Book
                        </button>*/}
                        <Link to={location.pathname+"/addReview"}>
                            <button className="btn btn-primary" styleName="btn">
                                Add a new Review
                            </button>
                        </Link>
                    </div>
                </div>
                )
        }


        return (
            <div>
                <div className="d-flex justify-content-between">
                    <BookDisplay book={book} isInList={false}/>
                    <div className="d-flex flex-column">
                        {/* hide delete button from the users
                        <button
                            className="btn btn-danger"
                            styleName="btn"
                            onClick={this.onDeleteBookClick.bind(this)}>
                            Delete Book
                        </button>*/}
                        <Link to={location.pathname+"/addReview"}>
                            <button className="btn btn-primary" styleName="btn">
                                Add a new Review
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="list-group">
                    { this.renderReview()}
                </div>
                <footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {

  return {
    bookObject: state.books.book,
    comments: state.books.comments
  };
}

const BookShowWithCSS = CSSModules(BookShow, styles)
export default connect(mapStateToProps, 
    { fetchABook, deleteBook, deleteReview, getComments, deleteComment })(BookShowWithCSS);