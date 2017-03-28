import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/index';
import { Link } from 'react-router';
import BookDisplay from '../components/book_display_component';
import { Row, Col, Pagination } from 'antd';
import styles from './container.scss';
import CSSModules from 'react-css-modules';

import { Button } from 'antd';


class BooksList extends Component {

  constructor(props) {
    super(props);
    this.props.fetchBooks(); // fetch the data from the postgres server

    this.state = {
      booksList: [],
      booksDisplayed: [],
      page: 1
    }

    this.onPageChange = this.onPageChange.bind(this); 
    this.renderBooksList = this.renderBooksList.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      this.setState({
        booksList: nextProps.books,
        booksDisplayed: nextProps.books.slice(0, 16)
      })
    }
  }

  onPageChange(page, pageSize){
    const { booksList } = this.state;

    this.setState({
      booksDisplayed: booksList.slice(16*(page-1), 16*page),
      page: page
    })
  }

  renderBooksList(){
    const booksNum = this.state.booksDisplayed.length;
    const books = this.state.booksDisplayed;
    let rows = [];

    if (booksNum%4 === 0){
      console.log(booksNum)
      for (let i = 0; i < booksNum; i+=4){
        rows.push(
          <Row type="flex" justify="left" align="top">
            <Col span={4}>
              <Link to={`books/${books[i].id}`} key={books[i].id} styleName="a_book hvr-float">
                <BookDisplay book={books[i]} isInList />
              </Link>
            </Col>
            <Col span={4}>
              <Link to={`books/${books[i+1].id}`} key={books[i+1].id} styleName="a_book hvr-float">
                <BookDisplay book={books[i+1]} isInList />
              </Link>
            </Col>
            <Col span={4}>
              <Link to={`books/${books[i+2].id}`} key={books[i+2].id} styleName="a_book hvr-float">
                <BookDisplay book={books[i+2]} isInList />
              </Link>
            </Col>
            <Col span={4}>
              <Link to={`books/${books[i+3].id}`} key={books[i+3].id} styleName="a_book hvr-float">
                <BookDisplay book={books[i+3]} isInList />
              </Link>
            </Col>
          </Row>
          )
      }
    }

    else{
      console.log(booksNum)
      for (var i = 0; i < booksNum; i+=4){
        if(i > booksNum || i + 1 > booksNum || i + 2 > booksNum || i + 3  >= booksNum) break;
        rows.push(
          <Row type="flex" justify="left" align="top">
            <Col span={4}>
              <Link to={`books/${books[i].id}`} key={books[i].id} styleName="a_book hvr-float">
                <BookDisplay book={books[i]} isInList />
              </Link>
            </Col>
            <Col span={4}>
              <Link to={`books/${books[i+1].id}`} key={books[i+1].id} styleName="a_book hvr-float">
                <BookDisplay book={books[i+1]} isInList />
              </Link>
            </Col>
            <Col span={4}>
              <Link to={`books/${books[i+2].id}`} key={books[i+2].id} styleName="a_book hvr-float">
                <BookDisplay book={books[i+2]} isInList />
              </Link>
            </Col>
            <Col span={4}>
              <Link to={`books/${books[i+3].id}`} key={books[i+3].id} styleName="a_book hvr-float">
                <BookDisplay book={books[i+3]} isInList />
              </Link>
            </Col>
          </Row>
          )
      }
      let cols = [];
      for (let j = i; j < booksNum; j++){
        console.log("testing j: ", j)
        cols.push(
          <Col span={4}>
            <Link to={`books/${books[j].id}`} key={books[j].id} styleName="a_book hvr-float">
              <BookDisplay book={books[j]} isInList />
            </Link>
          </Col>
          )
      }
      rows.push(
        <row>
          {cols}
        </row>
        )    }
    return rows;
  }

  render() {
    const { books } = this.props;

    // this part here is essential, wait until the data is here
    if (!books || books === []) {
      return <div>Loading...</div>;
    }

    //calculate how many pages we need
    let booksTotal = books.length
    let pageNum = (booksTotal % 16 === 0) ? booksTotal/16 : (booksTotal/16) + 1;  
    let pages = [];

    //put the books into each page
    for(let i = 0; i < pageNum; i++){
      if (i === pageNum - 1) pages = [...pages, books.slice(16*i)]
      else pages = [...pages, books.slice(16*i, 16 * i + 16)]
    }

    /*pages.forEach((page) => {
      page.forEach((book) => {
        console.log(book)
      })
    })*/

    return (
      <div>
        <Link to="/books/new" className="btn btn-primary" styleName="btn">
          Add a Book Review
        </Link>
        <Link to="/journey" className="btn btn-primary" styleName="btn">
          Start Reading a Book
        </Link>
        <Pagination current={this.state.page}
                      pageSize={16} 
                      total={booksTotal}
                      styleName="pagination_top"
                      onChange={this.onPageChange}/>
        <Row>
          {this.renderBooksList()}
        </Row>
        <div styleName="pagination">
          <Pagination current={this.state.page}
                      pageSize={16} 
                      total={booksTotal}
                      onChange={this.onPageChange}/>
        </div>
      </div>

    /*  <div>
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
      </div> */
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books.all };
}

const BooksListWithCSS = CSSModules(BooksList, styles, {allowMultiple: true});
export default connect(mapStateToProps, { fetchBooks })(BooksListWithCSS);
