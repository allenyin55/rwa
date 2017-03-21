import React from 'react';
import { connect } from 'react-redux';
import { createWord, getWords, getWordDef } from '../actions/index.js';
import renderInput from "../utils/render_input.js";
import SearchWords from './search_words_container.js';
import { Button } from 'semantic-ui-react';
import { Modal, Alert } from 'antd';
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

    this.handleOpen = this.handleOpen.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({
      modalOpen: true,
    })
  }

  handleClose(){
    this.setState({
      modalOpen: false
    })
  }

  error() {
    Modal.error({
      title: 'Sorry...',
      content: "Whatever you just entered doesn't make any sense to me...",
      okText: "Got it"
    });
  }

  onClickAdd(){
    var props = {
      word: this.props.wordSelected,
      book_id: this.props.book_id,
      dateedited: new Date().toUTCString(),
      profile_id: this.props.profile_id
    };
    console.log(props.word)
    if (!props.word) return this.error();
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
                modalOpen: false,
              })
            })
        }		
			})
	}

	render () {

    return (
      <div>
        <Button onClick={this.handleOpen} basic color="green">Add a word</Button>
        <Modal title="Add a word"
          visible={this.state.modalOpen}
          onOk={this.onClickAdd}
          onCancel={this.handleClose}
          okText="Add"
          cancelText="Cancel"
        >
          <SearchWords />
        </Modal>
      </div>
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