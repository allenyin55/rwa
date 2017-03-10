import React from 'react';
import { connect } from 'react-redux';
import { createWord, getWords, getWordDef } from '../actions/index.js';
import renderInput from "../utils/render_input.js";
import { reduxForm, Field } from 'redux-form';
import { Modal, Button } from 'semantic-ui-react';
import validate from '../utils/form_validate.js';
import CSSModules from 'react-css-modules';
import styles from './modal.scss';

class AddWord extends React.Component{
	constructor () {
    super();

    this.state = {
      modalOpen: false
    }
  }

  handleOpen(){
    this.setState({
      modalOpen: true
    })
  }

  handleClose(){
    this.setState({
      modalOpen: false
    })
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
            this.setState({
              modalOpen: false
            })
					})
			})
	}

	render () {
		const { handleSubmit } = this.props;

    return (
      <Modal open={this.state.modalOpen}
             onClose={this.handleClose.bind(this)}
             size="small"
             trigger={<Button onClick={this.handleOpen.bind(this)} basic color="green">Add a word</Button>}>
        <Modal.Header>Add a word to the book's vocabulary</Modal.Header>
        <Modal.Content>
        <Modal.Actions>
           <form  styleName="center_input"
                  onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="word"
                   placeholder="add a new word from this book" 
                   minRows={1}
                   maxRows={1}
                   component={renderInput} type="text" />
            <Button basic color="violet"
                    styleName="space_for_inline_ele"
                    type="submit">Add</Button>
          </form>
        </Modal.Actions>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state){
	return {wordDef: state.books.wordDef}
}

const AddWordWithCSS = CSSModules(AddWord, styles);
export default connect(mapStateToProps, { createWord, getWords, getWordDef }) (reduxForm({
    form: 'WordNewForm',
    validate
}) (AddWordWithCSS));