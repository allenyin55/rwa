import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createWord, getWords, getWordDef } from '../actions/index.js';
import renderInput from '../utils/render_input.js';
import { reduxForm, Field } from 'redux-form';
import validate from '../utils/form_validate.js';
import CSSModules from 'react-css-modules';
import styles from './modal.scss';

class AddWord extends React.Component{
	constructor () {
    super();
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
	
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal (e) {
    e.preventDefault();
    this.setState({ showModal: false });
  }

  onSubmit(props){
		props.dateedited = new Date().toUTCString();
		props.book_id = this.props.book_id;
		props.profile_id = this.props.profile_id;
		this.props.getWordDef(props.word)
			.then(() => {
				props.definition = this.props.wordDef[0];
				this.props.createWord(props)
					.then(() => {
						this.props.getWords(props);
						this.setState({showModal: false})
					})
			})
	}

	render () {
		const { handleSubmit } = this.props;

    return (
      <div>
        <button className="btn btn-primary" 
        				styleName="btn for_margin_in_reviewWidget" 
        				onClick={this.handleOpenModal}>{this.props.trigger}</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="commentBox"
           styleName="Overlay_word"
        >
        	<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	        	<h5 styleName="header_space">Add a Word</h5>
	          <Field name="word"
                   placeholder="add a new word from this book" 
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} type="text" />
	          <button styleName="same_line comment_btns" 
	          				className="btn btn-primary"
	          				type="submit">Submit</button>
	          <button styleName="same_line comment_btns" 
	          				className="btn btn-danger"
	          				onClick={this.handleCloseModal}>Cancel</button>
         	</form>
        </ReactModal>
      </div>
    );
  }
}

function mapStateToProps(state){
	return {wordDef: state.books.wordDef}
}

const AddWordWithCSS = CSSModules(AddWord, styles, {allowMultiple: true})
export default connect(mapStateToProps, { createWord, getWords, getWordDef }) (reduxForm({
    form: 'WordNewForm',
    validate
}) (AddWordWithCSS));