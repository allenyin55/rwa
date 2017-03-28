import React from 'react';
import { connect } from 'react-redux';
import { getUserBooks, fetchABook, selectBook } from '../actions/index';
import { Link } from 'react-router';
import BookShelfItem from '../components/bookshelf_item_component';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.props.getUserBooks({ profile_id: this.props.profile.identities[0].user_id });
  }

  //Both user_stats and books are stored in
  //user_reading_info, and they are stored
  //out of order. I extracted them both here
  //and match the the correct ones. Then I 
  //put them together which makes them easier
  //to access
  mapUserStatsToBooks(user_reading_info){

    const user_stats = user_reading_info[0];
    const books = user_reading_info[1];

    books.map((book) => {
      user_stats.map((user_stat) => {
        if(book.id === user_stat.book_id) book.user_stats = user_stat;
      })
    })

    return books;
  }

  setSelectedBook(book){
    // select a book to be updated/edited
    this.props.selectBook(book);
  }

  render() {
    const { profile } = this.props;
    const { user_reading_info } = this.props;

    if (user_reading_info === undefined) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    const books = this.mapUserStatsToBooks(user_reading_info);
   
    if (books.length === 0) {
      return (
        <div>
        You haven't started any reading journey yet!
      </div>
      );
    }
    
    return (
      <div>
        <img styleName="same_line big_headshot" src={profile.picture_large}/>
        <h2 styleName="same_line">{profile.name}'s book shelf</h2>
        <div styleName="some_space" className="d-flex align-content-start flex-wrap">
           {books.map(book => (
            <Link styleName="hvr-float" 
                  to={"/profile/update/"+book.id} 
                  key={book.id + "link"} 
                  onClick={() => this.setSelectedBook.bind(this)(book)}>
              <BookShelfItem book={book} key={book.id}/>
            </Link>
                     ))
        } 
        </div>
        <footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_reading_info: state.profile.userBooks.user_reading_info,
  };
}

const ProfileWithCSS = CSSModules(Profile, styles,  {allowMultiple: true});
export default connect(mapStateToProps, { getUserBooks, fetchABook, selectBook })(ProfileWithCSS);
