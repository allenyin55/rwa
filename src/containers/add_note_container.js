import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createNote, getNotes } from '../actions/index.js';
import renderInput from '../utils/render_input.js';
import { reduxForm, Field } from 'redux-form';
import validate from '../utils/form_validate.js';
import CSSModules from 'react-css-modules';
import styles from './modal.scss';

class Modal extends React.Component{
	
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
		this.props.createNote(props)
			.then(() => {
        //to update the notes in update_journey
        this.props.getNotes(props);
			  this.setState({ showModal: false });
  	});
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
           styleName="Overlay"
        >
        	<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	        	<h5 styleName="header_space">Add a note</h5>
            <h5 styleName="header_space">Title</h5>
            <Field name="noteTitle" 
                   placeholder="title" 
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} 
                   type="text" />
            <h5 styleName="header_space">Page Number</h5>
            <Field name="notePgNum" 
                   placeholder="page number" 
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} 
                   type="text" />
            <h5 styleName="header_space">Paragraph Number</h5>
            <Field name="noteParaNum" 
                   placeholder="paragraph number" 
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} 
                   type="text" />
            <h5 styleName="header_space">Sentence Number</h5>
            <Field name="noteSenNum" 
                   placeholder="sentence number" 
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} 
                   type="text" />
            <h5 styleName="header_space">Content</h5>
	          <Field name="content"
                   placeholder="content" 
                   minRows={6}
                   maxRows={9}
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

const ModalWithCSS = CSSModules(Modal, styles, {allowMultiple: true});
export default connect(null, { createNote, getNotes }) (reduxForm({
    form: 'NoteNewForm',
    validate
}) (ModalWithCSS));