import React from "react";
import { reduxForm, Field } from 'redux-form';
import { createJourney, getBookInfo, getGuessedBookInfo } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AutoSuggest from '../components/auto_suggest_component';
import Textarea from 'react-textarea-autosize';
import validate from '../utils/form_validate';
import Rating from 'react-rating';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

class JourneyNew extends React.Component{

  //like props, don't abuse it. Only use it with router
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: "1",
      selectedItemId: null,
      selectedFeeling: 0,
      note: "",
    };
  }

  // to get the index of the selected item from the auto-complete child component
  getSelectedItemId(itemId){
    this.setState({
      selectedItemId: itemId
    })
  }

  onRatingChange(rate){
    this.setState({
      selectedFeeling: rate
    })
  }

  onNoteChange(e){
    this.setState({
      note: e.target.value
    })
  }

  onSubmit(props){
    props.dateAdded = new Date().toUTCString();
    props.startingDate = new Date().toUTCString();
    props.initial_feeling = this.state.selectedFeeling;
    props.final_feeling = '0';  //this means it's unset. It's string because we have parseInt() in the backend
    props.reading_status = '0'; //meaning just start readign
    props.note = this.state.note;
    props.profile_id = this.props.profile.identities[0].user_id;
    //if props.selectedId is null, do the search books
    //through getGuessedBookInfo with props.title
    if (this.state.selectedItemId === null) {
      this.props.getGuessedBookInfo(props.title)
        .then(()=>{
          props.bookInfo = this.props.bookInfo;
          this.props.createJourney(props)
            .then(()=>{
              //blog Book has been created, navigate the user to the index
              this.context.router.push('/profile');
            })
        });
    }
    else{
      this.props.getBookInfo(this.state.selectedItemId)
        .then(()=>{
          props.bookInfo = this.props.bookInfo;
          this.props.createJourney(props)
            .then(()=>{
              //blog Book has been created, navigate the user to the index
              this.context.router.push('/profile');
            })
        });
    }
  }

  render(){

    const { handleSubmit } = this.props;

    return(
     <form styleName="center_input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
       <h2>Start a new reading Journey</h2>
       <div styleName="some_space">
         <h5>Search for a book</h5>
         <Field name="title" component={AutoSuggest} onSuggestionSelected={this.getSelectedItemId.bind(this)}
                placeholder="Search for a book"/>
       </div>
       <div styleName="some_space">
         <h5>How excited are you about this book?</h5>
         <div>
          <Rating 
            initialRate={this.state.selectedFeeling}
            empty={<img src='/images/flame_empty.png'/>}
            full={<img src='/images/flame_full.png'/>}
            fractions = '10' 
            onChange={this.onRatingChange.bind(this)}/>
         </div>
       </div>
      
      <div styleName="some_space">
        <h5>Add your first note</h5>
        <Textarea
          onChange={this.onNoteChange.bind(this)}
          minRows={6}
          maxRows={9}
          placeholder="Leave it blank if you don't have anything to say yet!"
         />
      </div>

       <button type="submit" className="btn btn-primary" styleName="btn">Start Reading</button>
       <Link to="/" className="btn btn-danger" styleName="btn">Cancel</Link>
     </form>
    );
  }
}

function mapStateToProps(state) {
  return {bookInfo: state.books.bookInfo}
}


const JourneyNewWithCSS = CSSModules(JourneyNew, styles)
//validation for redux-from is imported from from-validate.js in the folder utils
export default connect(mapStateToProps, { createJourney, getBookInfo, getGuessedBookInfo}) (reduxForm({
  form: 'JourneyNewForm',
  validate
})(JourneyNewWithCSS))