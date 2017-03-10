import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createNote, getNotes } from '../actions/index.js';
import renderInput from "../utils/render_input.js";
import { Modal, Button } from "semantic-ui-react"
import { reduxForm, Field } from 'redux-form';
import validate from '../utils/form_validate.js';
import CSSModules from 'react-css-modules';
import styles from './modal.scss';

class AddNote extends React.Component{
	
	constructor () {
    super();
    this.state = {
      modalOpen: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
	
  handleOpenModal () {
    this.setState({ modalOpen: true });
  }
  
  handleCloseModal (e) {
    e.preventDefault();
    this.setState({ modalOpen: false });
  }

  onSubmit(props){
		props.dateedited = new Date().toUTCString();
		props.book_id = this.props.book_id;
		props.profile_id = this.props.profile_id;
		this.props.createNote(props)
			.then(() => {
        //to update the notes in update_journey
        this.props.getNotes(props);
			  this.setState({ modalOpen: false });
  	});
	}

	render () {
		const { handleSubmit } = this.props;

    return (
      <div>
        <Modal open={this.state.modalOpen}
               onClose={this.handleCloseModal.bind(this)}
               size="small"
               trigger={<Button basic color="green"
                                onClick={this.handleOpenModal}>Add a note</Button>}>
          <Modal.Header>Add a word to the book's vocabulary</Modal.Header>
          <Modal.Content>
          <Modal.Actions>
             <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <h5 styleName="header_space">Add a note</h5>
              <h5 styleName="header_space">Title</h5>
              <Field name="noteTitle" 
                     placeholder="title" 
                     minRows={1}
                     maxRows={2}
                     component={renderInput} 
                     type="text" />
              <h5 styleName="header_space">Page Number</h5>
              <Field name="notePgNum" 
                     placeholder="page number" 
                     minRows={1}
                     maxRows={2}
                     component={renderInput} 
                     type="text" />
              <h5 styleName="header_space">Paragraph Number</h5>
              <Field name="noteParaNum" 
                     placeholder="paragraph number" 
                     minRows={1}
                     maxRows={2}
                     component={renderInput} 
                     type="text" />
              <h5 styleName="header_space">Sentence Number</h5>
              <Field name="noteSenNum" 
                     placeholder="sentence number" 
                     minRows={1}
                     maxRows={2}
                     component={renderInput} 
                     type="text" />
              <h5 styleName="header_space">Content</h5>
              <Field name="content"
                     placeholder="content" 
                     minRows={6}
                     maxRows={9}
                     component={renderInput} 
                     type="text" />
              <button styleName="same_line comment_btns"
                      className="btn btn-primary" 
                      type="submit">Submit</button>
              <button styleName="same_line comment_btns" 
                      className="btn btn-danger"
                      onClick={this.handleCloseModal}>Cancel</button>
            </form>
          </Modal.Actions>
          </Modal.Content>
      </Modal>
      </div>
    );
  }
}

const AddNoteWithCSS = CSSModules(AddNote, styles, {allowMultiple: true});
export default connect(null, { createNote, getNotes }) (reduxForm({
    form: 'NoteNewForm',
    validate
}) (AddNoteWithCSS));