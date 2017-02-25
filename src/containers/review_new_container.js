import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createReview, fetchABook } from '../actions/index';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import AddReview from '../components/add_reviews_component';
import validate from '../utils/form_validate';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

class AddNewReview extends Component{

  constructor(props){
  super(props);
  this.props.fetchABook(this.props.params.id);

  this.state = {
      selectedRating: 0
    }
  }

  //like props, don't abuse it. Only use it with router
  static contextTypes = {
      router: PropTypes.object
  };

  onRatingChange(rate){
    this.setState({
      selectedRating: rate
    })
  }

  onSubmit(props){
      const { profile } = this.props;
      props.reviewer = profile;
      props.dateEdited = new Date().toUTCString();
      props.id = this.props.params.id;
      props.rating = this.state.selectedRating;
      this.props.createReview(props)
          .then(()=>{
              //blog Book has been created, navigate the user to the index
              this.context.router.push("/books/"+props.id);
          });
  }

  render(){

      const { handleSubmit } = this.props;

      if(!this.props.bookObject){ // try to figure out why do I need this and how does data flow!!
          return <div>Loading...</div>
      }

      return(
          <form styleName='center_input' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <h3>Add a review on {this.props.bookObject.book.title}</h3>
              <div styleName="some_space">
                <h5>Rating</h5>
                <Rating 
                initialRate={this.state.selectedRating}
                empty={<img src='/images/star_grey.png'/>}
                full={<img src='/images/star_yellow.png'/>}
                fractions = '10' 
                onChange={this.onRatingChange.bind(this)}/>
              </div>
              <div>
                <AddReview/>
              </div>
              <button type="submit" className="btn btn-primary" styleName='btn'>Submit</button>
              <Link to="/" className="btn btn-danger" styleName="btn">Cancel</Link>
          </form>
      );
  }
}

function mapStateToProps(state) {
    return {
        bookObject: state.books.book
    }
}


const AddNewReviewWithCSS = CSSModules(AddNewReview, styles)

//validation for redux-from is imported from from-validate.js in the folder utils
export default connect(mapStateToProps, { createReview, fetchABook }) (reduxForm({
  form: 'ReviewNewForm',
  validate
})(AddNewReviewWithCSS))