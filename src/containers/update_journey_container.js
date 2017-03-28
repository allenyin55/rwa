import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import validate from '../utils/form_validate.js';
import { updateJourney, deleteJourney, getNotes, editNote,
				 getWords, deleteWord, deleteNote } from '../actions/index.js';
import BookShelfItem from '../components/bookshelf_item_component.js';
import ShowContent from '../components/view_content_modal_component.js';
import ShowDef from '../components/view_def_component.js';
import AddNote from './add_note_container.js';
import AddWord from './add_word_container.js';
import Select from 'react-select';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import 'react-select/dist/react-select.css';
import { Modal } from 'antd';
//use to show confirm dialog
const confirm = Modal.confirm;

class UpdateJourney extends React.Component{

  //like props, don't abuse it. Only use it with router
  static contextTypes = {
      router: PropTypes.object
  };

	constructor(props) {
    super(props);
    
    this.state={
    	word_list: [],
    	reading_status: 0 
    }
  }

  getIds(){
  	const ids = {
  		book_id: this.props.params.id,
  		profile_id: this.props.profile.identities[0].user_id
  	};

  	return ids;
  }

  componentDidMount(){
    this.props.getNotes(this.getIds());
    this.props.getWords(this.getIds());
    console.log(this.props.words)
  }

	onChange(val){
		this.setState({
			reading_status: val.value
		})
	}

	onDeleteJourney(){
		const self = this;
		confirm({
	    title: 'Are you sure you want to delete this journey?',
	    content: 'This will delete all your progress with this book',
	    okText: 'OK',
	    cancelText: 'Cancel',
	    onOk() {
	      self.props.deleteJourney(self.props.params.id)
					.then(() => self.context.router.push("/profile"));
	    },
	    onCancel() {},
	  });
	}

	onDeleteWord(word_id){
		const self = this;
		confirm({
	    title: 'Are you sure you want to delete this word?',
	    content: 'This will delete the word from this book.',
	    okText: 'OK',
	    cancelText: 'Cancel',
	    onOk() {
	      self.props.deleteWord(word_id)
					.then(() => self.props.getWords(self.getIds()))
	    },
	    onCancel() {},
	  });
	}

	onEditNote(props){
		this.props.editNote(props)
      .then(() => {
        //to update the notes in update_journey
        this.props.getNotes(this.getIds())
      });
	}

	onDeleteNote(note_id){
		const self = this;
		confirm({
	    title: 'Are you sure you want to delete this note?',
	    content: 'This will delete everything in this note',
	    okText: 'OK',
	    cancelText: 'Cancel',
	    onOk() {
	      self.props.deleteNote(note_id)
					.then(() => self.props.getNotes(self.getIds()))
	    },
	    onCancel() {},
	  });
	}

	onSubmit(props){
		props.reading_status = this.state.reading_status;
		props.book_id = this.props.params.id;
		props.profile_id = this.props.profile.identities[0].user_id;
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
					<ShowContent note={note} 
											 key={note.note_id} 
											 onEditNote={this.onEditNote.bind(this)}
											 onDeleteNote={this.onDeleteNote.bind(this)} />
				))}
			</div>
		}

		const { words } = this.props;
		let wordsList = null;
		if (words.length !== 0){
			wordsList = <div styleName="word_list" className="list-group">
				{words.map((word) => (
					<ShowDef word={word} key={word.word_id} onDeleteWord={this.onDeleteWord.bind(this)}/>
				))}
			</div>
		}

		return(
			<div>
				<div className="row">
				<div className="col-3">
					<button className="btn btn-danger"
									onClick={this.onDeleteJourney.bind(this)}>Delete Journey</button>
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
	        	<AddWord book_id={this.props.params.id}
		      					 profile_id={profile_id}/>
		      	{wordsList}
		      </div>
		      <div className="col-5">
		      	<AddNote book_id={this.props.params.id}
		      				 	 profile_id={profile_id}/>
		      	{notesList}
		      </div>
				</div>
				<footer/>
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
	{ updateJourney, deleteJourney, getNotes, editNote,
		getWords, deleteWord, deleteNote }) (reduxForm({
    form: 'UpdateJourneyForm',
    validate
})(UpdateJourneyWithCSS));