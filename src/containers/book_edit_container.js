import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { editBook, fetchABook } from '../actions/index';
import { Link } from 'react-router';
import Rating from 'react-rating';
import renderInput from '../components/render_input_component.js';
import validate from '../utils/form_validate';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

class BookEdit extends Component{

  constructor(props){
    super(props);
    this.props.fetchABook(this.props.params.id);

    this.state = {
      selectedRating: 0,
      review: null
    }
  }

  //like props, don't abuse it. Only use it with router
  static contextTypes = {
      router: PropTypes.object
  };

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps && nextProps.bookObject){
      //if the bookObject prop is received, use that to update the
      //review state. review now is a piece of state with a review object
      const review = nextProps.bookObject.reviews.filter((review) => {
        if (review.review_id === parseInt(this.props.params.review_id)){
          return review;
        }
      })
      if (review[0].review !== this.state.review){
        //only set the state if the review is different
        //needed because the change of props made by redux-form 
        //will triggered this setState and reset the user's rating input
         this.setState({
          selectedRating: review[0].rating,
          review: review[0].review
      })
      }
    }
  }

  onSubmit(props){
      props.reviewer = this.props.profile;
      props.review_id = location.pathname.split('/').pop();
      props.dateEdited = new Date().toUTCString();
      props.rating = this.state.selectedRating;
      props.id = this.props.bookObject.book.id;
      this.props.editBook(props)
          .then(()=>{
              //blog Book has been created, navigate the user to the index
              this.context.router.push("/books/"+this.props.bookObject.book.id);
          });
  }

  onRatingChange(rate){
    this.setState({
      selectedRating: rate
    })
  }


  render(){

    const { handleSubmit } = this.props;

    if(!this.props.bookObject){ // try to figure out why do I need this and how does data flow!!
      return <div>Loading...</div>
    }

    return(
        <form styleName="center_input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h3>Edit your review</h3>
            <Rating 
              styleName="space_for_inline_ele"
              initialRate={this.state.selectedRating}
              empty={<img src='/images/star_grey.png'/>}
              full={<img src='/images/star_yellow.png'/>}
              fractions = {10}
              onChange={this.onRatingChange.bind(this)}/> 
            <Field name="review"
                   defaultValue={this.state.review} 
                   component={renderInput} 
                   type="text" />
            <button type="submit" 
                    className="btn btn-primary" 
                    styleName="btn">Submit</button>

            <Link to={`/books/${this.props.bookObject.book.id}`} className="btn btn-danger" styleName="btn">Cancel</Link>
        </form>
    );
  }
}

function mapStateToProps(state) {
  return {
      bookObject: state.books.book
  }
}


const BookEditWithCSS = CSSModules(BookEdit, styles);
//validation for redux-from is imported from from-validate.js in the folder utils
export default connect(mapStateToProps, { editBook, fetchABook }) (reduxForm({
  form: 'BooksNewForm',
  validate
})(BookEditWithCSS))