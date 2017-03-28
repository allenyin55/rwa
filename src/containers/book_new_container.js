import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { createBook, getBookInfo, getGuessedBookInfo } from '../actions/index';
import { Link } from 'react-router';
import renderInput from '../components/render_input_component.js';
import SearchBooks from '../components/search_books_component';
import Rating from 'react-rating';
import validate from '../utils/form_validate';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

class BooksNew extends Component{

    //like props, don't abuse it. Only use it with router
    static contextTypes = {
        router: PropTypes.object
    };

  constructor() {
    super();

    this.state = {
      selectedItemId: null,
      selectedRating: 0
    }
  }

  // to get the index of the selected item from the auto-complete child component
  getSelectedItemId(itemId){
    this.setState({
      selectedItemId: itemId
    })
  }


  onRatingChange(rate){
    this.setState({
      selectedRating: rate
    })
  }

  onSubmit(props){
        const { profile } = this.props;
        props.reviewer = profile;
        props.dateAdded = new Date().toUTCString();
        props.dateEdited = new Date().toUTCString();
        props.selectedId = this.state.selectedItemId;
        props.rating = this.state.selectedRating;
        //if props.selectedId is null, do the search books
        //through getGuessedBookInfo with props.title
        if (props.selectedId === null) {
          this.props.getGuessedBookInfo(props.title)
            .then(()=>{
              props.bookInfo = this.props.bookInfo;
              this.props.createBook(props)
                .then(()=>{
                  //blog Book has been created, navigate the user to the index
                  this.context.router.push('/');
                })
            });
        }

        else{
          this.props.getBookInfo(props.selectedId)
            .then(()=>{
              props.bookInfo = this.props.bookInfo;
              this.props.createBook(props)
                .then(()=>{
                  //blog Book has been created, navigate the user to the index
                  this.context.router.push('/');
                })
            });
        }
    }

    render(){
      const { handleSubmit } = this.props;

      return(
        <form styleName="center_input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create a New Book</h3>
          <div styleName="some_space">
            <h5>Title</h5>
            <SearchBooks onSuggestionSelected={this.getSelectedItemId.bind(this)}/>
          </div>
          <div styleName="some_space">
            <h5>Rating</h5>
            <Rating 
            initialRate={this.state.selectedRating}
            empty={<img src='/images/star_grey.png'/>}
            full={<img src='/images/star_yellow.png'/>}
            fractions = '10' 
            onChange={this.onRatingChange.bind(this)}/>
          </div>
          <h5 styleName="some_space">review</h5>
           <Field name="review" component={renderInput} type="text" />
          <button type="submit" className="btn btn-primary" styleName="btn">Submit</button>
          <Link to="/" className="btn btn-danger" styleName="btn">Cancel</Link>
        </form>
      );
    }
}

function mapStateToProps(state) {
    return {bookInfo: state.books.bookInfo}
}


const BooksNewWithCSS = CSSModules(BooksNew, styles);
//validation for redux-from is imported from from-validate.js in the folder utils
export default connect(mapStateToProps, { createBook, getBookInfo, getGuessedBookInfo}) (reduxForm({
    form: 'BooksNewForm',
    validate
})(BooksNewWithCSS))