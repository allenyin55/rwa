import React from 'react';
import { connect } from 'react-redux';
import { createWord, getWords, getWordDef } from '../actions/index.js';
import renderInput from "../utils/render_input.js";
import SearchWords from './search_words_container.js';
import { Modal, Button } from 'semantic-ui-react';
import { Modal as antd_Modal } from 'antd';
import validate from '../utils/form_validate.js';
import CSSModules from 'react-css-modules';
import styles from './modal.scss';
const ERROR_MESSAGE = "ERROR_MESSAGE";

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

  error() {
    antd_Modal.error({
      title: 'Sorry...',
      content: "The word you entered doesn't make any sense to me...",
      okText: "Got it"
    });
  }

  onClick(){
    var props = {
      word: this.props.wordSelected,
      book_id: this.props.book_id,
      dateedited: new Date().toUTCString(),
      profile_id: this.props.profile_id
    };
		this.props.getWordDef(props.word)
			.then(() => {
        if(this.props.wordDef === ERROR_MESSAGE){
          this.error();
        }
        else{
          props.definition = this.props.wordDef[0];
          this.props.createWord(props)
            .then(() => {
              this.props.getWords(props);
              this.setState({
                modalOpen: false
              })
            })
        }		
			})
	}

	render () {

    return (
      <Modal open={this.state.modalOpen}
             onClose={this.handleClose.bind(this)}
             size="small"
             trigger={<Button onClick={this.handleOpen.bind(this)} basic color="green">Add a word</Button>}>
        <Modal.Header>Add a word to the book's vocabulary</Modal.Header>
        <Modal.Content>
        <Modal.Actions>
           <SearchWords/>
           <Button onClick={this.onClick.bind(this)} 
                   styleName="some_space"
                   basic 
                   color="blue">Add</Button>
        </Modal.Actions>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state){
	return {
    wordDef: state.books.wordDef,
    wordSelected: state.words.wordSelected
  }
}

const AddWordWithCSS = CSSModules(AddWord, styles);
export default connect(mapStateToProps, { createWord, getWords, getWordDef }) (AddWordWithCSS);