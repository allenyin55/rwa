import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editBook, fetchABook } from '../actions/index';
import { Link } from 'react-router';
import AddReview from '../components/add_reviews_component';
import validate from '../utils/form_validate';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

class BookEdit extends Component{

  constructor(props){
    super(props);
    this.props.fetchABook(this.props.params.id);
  }

    //like props, don't abuse it. Only use it with router
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props){
        props.reviewer = this.props.profile;
        props.review_id = location.pathname.split('/').pop();
        props.dateEdited = new Date().toUTCString();
        this.props.editBook(props)
            .then(()=>{
                //blog Book has been created, navigate the user to the index
                this.context.router.push("/books/"+this.props.bookObject.book.id);
            });
    }

    render(){

        const { handleSubmit } = this.props;


      if(!this.props.bookObject){ // try to figure out why do I need this and how does data flow!!
        return <div>Loading...</div>
      }

        return(
            <form styleName="center_input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Edit your review</h3>
                <AddReview/>
                <button type="submit" className="btn btn-primary" styleName="btn">Submit</button>
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