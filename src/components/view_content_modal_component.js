import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { editNote, deleteNote } from '../actions/index.js';
import renderInput from '../utils/render_input.js';
import { reduxForm, Field } from 'redux-form';
import validate from '../utils/form_validate.js';
import CSSModules from 'react-css-modules';
import styles from './modal_component.scss'

class ShowContent extends React.Component{
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

  handleDeleteNote(note_id){
    if(confirm('Are you sure you want delete the note?')) {
            this.props.deleteNote(note_id)
            .then(() => {
              location.reload();
            });
        }
  }

  onSubmit(props){
    props.dateedited = new Date().toUTCString();
    props.note_id = this.props.note.note_id;
    this.props.editNote(props)
      .then(() => {
        //to update the notes in update_journey
        console.log(props)
        location.reload();
        this.setState({ showModal: false });
    });
  }


  render(){

		const { note } = this.props;
    const { handleSubmit } = this.props;

  	return(
  		<div>
  			<div onClick={this.handleOpenModal}
             styleName="clickable" 
             className="list-group-item list-group-item-action">
        	<div className="d-flex w-100 justify-content-end">
        		<div className="mr-auto p-2">{note.title}</div>
        		<div className="p-2">Pg: {note.pagenum} para: {note.paragraphnum} sen: {note.sentencenum}</div>
        	</div>
        </div>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="commentBox"
           styleName="Overlay"
        >
        	<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <button className="btn btn-danger"
                    styleName="same_line comment_btns"
                    onClick={() => this.handleDeleteNote(note.note_id)}>Delete</button>
            <button styleName="same_line comment_btns" 
                    className="btn btn-danger"
                    onClick={this.handleCloseModal}>Cancel</button>
            <h5 styleName="header_space">Title</h5>
            <Field name="noteTitle" 
                   defaultValue={note.title}
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} 
                   type="text" />
            <h5 styleName="header_space">Page Number</h5>
            <Field name="notePgNum" 
                   defaultValue={note.pagenum}
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} 
                   type="text" />
            <h5 styleName="header_space">Paragraph Number</h5>
            <Field name="noteParaNum" 
                   defaultValue={note.paragraphnum} 
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} 
                   type="text" />
            <h5 styleName="header_space">Sentence Number</h5>
            <Field name="noteSenNum" 
                   defaultValue={note.sentencenum}
                   minRows={1}
                   maxRows={2}
                   component={CSSModules(renderInput, styles)} 
                   type="text" />
            <h5 styleName="header_space">Content</h5>
            <Field name="content"
                   defaultValue={note.content} 
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
  		)
  }
}

const ShowContentWithCSS = CSSModules(ShowContent, styles, {allowMultiple: true});
export default connect(null, { editNote, deleteNote }) (reduxForm({
    form: 'NoteEditForm',
    validate
}) (ShowContentWithCSS));;