import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import renderInput from '../components/render_input_component.js';
import { createComment, getComments } from '../actions/index.js';
import { reduxForm, Field } from 'redux-form';
import validate from '../utils/form_validate.js';
import CSSModules from 'react-css-modules';
import styles from './modal.scss'

class Modal extends React.Component{
	constructor () {
    super();
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  onSubmit(props){
		const { profile } = this.props;
    props.commenter = profile;
		props.review_id = this.props.review_id;
    props.book_id = parseInt(location.pathname.split('/')[2]);
		props.dateEdited = new Date().toUTCString();
    props.parentcomment_id = (this.props.trigger === "reply") ? this.props.comment_id : null
		//plus commentContent form stored by redux-form
		this.props.createComment(props)
			.then(() => {
        //to update the comments in book_show
        this.props.getComments(props.book_id);
			  this.setState({ showModal: false });
		})

  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal (e) {
    e.preventDefault();
    this.setState({ showModal: false });
  }
  
  render () {
		const { handleSubmit } = this.props;

    return (
      <div>
        <button className="btn btn-primary" styleName="btn for_margin_in_reviewWidget" onClick={this.handleOpenModal}>{this.props.trigger}</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="commentBox"
           styleName="Overlay"
        >
        	<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	        	<h5 styleName="header_space">Enter you comment</h5>
	          <Field name="commentContent" component={renderInput} type="text" />
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
export default connect(null, { createComment, getComments }) (reduxForm({
    form: 'CommentsNewForm',
    validate
}) (ModalWithCSS));