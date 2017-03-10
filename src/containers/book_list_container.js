import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/index';
import { Link } from 'react-router';
import BookDisplay from '../components/book_display_component';
import styles from './container.scss';
import CSSModules from 'react-css-modules';

import { Button } from 'antd';


class BooksList extends Component {

  constructor(props) {
    super(props);
    this.props.fetchBooks(); // fetch the data from the postgres server
  }

  render() {
    const { books } = this.props;

    // this part here is essential, wait until the data is here
    if (!books || books === []) {
      return <div>Loading...</div>;
    }

    return (

      <div>
        <div className="row">
          <div className="col-9">
            <div styleName='books_list'>
            <Link to="/books/new" className="btn btn-primary" styleName="btn">
              Add a Book Review
            </Link>
            <Link to="/journey" className="btn btn-primary" styleName="btn">
              Start Reading a Book
            </Link>
            </div>
            <div className="d-flex align-content-start flex-wrap">
              {books.map(book =>
                <Link to={`books/${book.id}`} key={book.id} styleName="a_book hvr-float">
                  <BookDisplay book={book} isInList />
                </Link>,
              )}
            </div>
          </div>
        </div>
        <footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books.all };
}

/* function mapDispatchToProps(dispatch) {
 return bindActionCreators({fetchBooks}, dispatch);
 }*/


const BooksListWithCSS = CSSModules(BooksList, styles, {allowMultiple: true});
export default connect(mapStateToProps, { fetchBooks })(BooksListWithCSS); // es6 which replaced the mapDispatchToProps function, and
// is the shorthand for {fetchBooks: fetchBooks}
