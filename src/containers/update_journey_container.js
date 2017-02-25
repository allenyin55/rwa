import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import validate from '../utils/form_validate.js';
import { updateJourney, getNotes, getWords, deleteWord } from '../actions/index.js';
import BookShelfItem from '../components/bookshelf_item_component.js';
import ShowContent from '../components/view_content_modal_component.js';
import ShowDef from '../components/view_def_component.js';
import Modal from './add_note_container.js';
import AddWord from './add_word_container.js';
import Select from 'react-select';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import 'react-select/dist/react-select.css';

class UpdateJourney extends React.Component{

	  //like props, don't abuse it. Only use it with router
    static contextTypes = {
        router: PropTypes.object
    };

	constructor(props) {
    super(props);
    
    this.state={
    	reading_status: 0 
    }
  }

  componentDidMount(){
  	let ids = {};
		ids.book_id = this.props.params.id
		ids.profile_id = this.props.profile.identities[0].user_id;
    this.props.getNotes(ids);
    this.props.getWords(ids);
  }

	onChange(val){
		this.setState({
			reading_status: val.value
		})
	}

	onSubmit(props){
		props.reading_status = this.state.reading_status;
		props.book_id = this.props.params.id;
		props.profile_id = this.props.profile.identities[0].user_id;
		console.log("asdfasdf", props.reading_status)
		if (props.reading_status === 3){
			this.props.updateJourney(props)
			.then(() => {
				this.context.router.push(`/books/${props.book_id}/addReview`);
			})
		}
		else{
			this.props.updateJourney(props)
			.then(() => {
				this.context.router.push("/profile");
			})
		}
	}

	render(){

		const { handleSubmit } = this.props;
		//options for reading status
		const  options = [
    { value: 0, label: 'reading' },
    { value: 1, label: 'save for later' },
    { value: 2, label: 'give up' },
    { value: 3, label: 'finish' }
    ];

		const profile_id = this.props.profile.identities[0].user_id;

		const { notes } = this.props;
		let notesList = null;
		if (notes.length !== 0){
			notesList = <div styleName="note_list" className="list-group">
				{notes.map((note) => (
					<ShowContent note={note} key={note.note_id} />
				))}
			</div>
		}

		const { words } = this.props;
		let wordsList = null;
		if (words.length !== 0){
			wordsList = <div styleName="word_list" className="list-group">
				{words.map((word) => (
					<ShowDef word={word} key={word.word_id} onDeleteWord={this.props.deleteWord}/>
				))}
			</div>
		}


		return(
			<div styleName="app_container" className="row">
			<div className="col-3">
				<BookShelfItem styleName="same_line" book={this.props.book} />
				<form styleName="same_line" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<label>Change your reading status</label>
						<Select
									    name="reading_status"
									    value={this.state.reading_status}
									    options={options}
									    clearable={false}
									    onChange={this.onChange.bind(this)}
									/>
	          <button type="submit" className="btn btn-primary" styleName="btn">Save</button>
	          <Link to="/profile" className="btn btn-danger" styleName="btn">Cancel</Link>
        	</form>
			</div>
				<div className="col-3" >
        	<AddWord trigger="Add a word" 
	      					 book_id={this.props.params.id}
	      					 profile_id={profile_id}/>
	      	{wordsList}
	      </div>
	      <div className="col-5">
	      	<Modal trigger="Add a note" 
	      				 book_id={this.props.params.id}
	      				 profile_id={profile_id}/>
	      	{notesList}
	      </div>
			</div>

			)
	}
}

function mapStateToProps(state) {

	if (state.books.bookSelected === null){
		return{
			book: null,
			notes: state.books.notes,
			words: state.books.words
		}
	}
  return {
    book: state.books.bookSelected,
    notes: state.books.notes,
    words: state.books.words
  };
}


const UpdateJourneyWithCSS = CSSModules(UpdateJourney, styles)
export default connect(mapStateToProps, 
	{ updateJourney, getNotes, getWords, deleteWord }) (reduxForm({
    form: 'UpdateJourneyForm',
    validate
})(UpdateJourneyWithCSS));