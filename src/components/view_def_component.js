import React from 'react';
import ReactModal from 'react-modal';
import CSSModules from 'react-css-modules';
import styles from './modal_component.scss'

class ShowDef extends React.Component{
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

  render(){

		const { word } = this.props;
    let def = word.definition;
    let senses = [];
    
    def.lexicalEntries.map((entry, i) => {
      let aSense = {};
      aSense.pronunciations = entry.pronunciations;
      aSense.lexicalCategory = entry.lexicalCategory;
      aSense.sense_id = entry.text + entry.lexicalCategory;
      entry.entries.map((item => {
        item.senses.map((sense) => {
          aSense.definitions = sense.definitions;
          aSense.examples = sense.examples;
          aSense
        })
      }))
     senses.push(aSense);
    })


    let wordDefs = senses.map((thSense, index) => (
      <div key={thSense.sense_id} styleName="word_def">
        <h6>{def.word}  /
        {(thSense.pronunciations) ? thSense.pronunciations[0].phoneticSpelling : "No Pronunciation"}
        /  {thSense.lexicalCategory}</h6>
        <div>Definition: {(thSense.definitions) ? thSense.definitions[0] : "No definition"}</div>
        <div>Example: {(thSense.examples) ? thSense.examples[0].text : "No example"}</div>
      </div>
    ))


  	return(
  		<div>
  			<div className="list-group-item list-group-item-action">
        	<div className="d-flex w-100 justify-content-end">
        		<div onClick={this.handleOpenModal}
                 styleName="clickable" 
                 className="mr-auto p-2">{word.definition.id}</div>
            <div className="p-2" 
                 styleName="delete_btn"
                 onClick={() => this.props.onDeleteWord(word.word_id)}>delete</div>
        	</div>
        </div>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="commentBox"
           styleName="Overlay_word_def"
        >
        	<form>
        		<div>{wordDefs}</div>
	          <button styleName="same_line comment_btns" 
                    className="btn btn-danger"
                    onClick={this.handleCloseModal}>Close</button>
         	</form>
        </ReactModal>
      </div>
  		)
  }
}

const ShowDefWithCSS = CSSModules(ShowDef, styles, {allowMultiple: true});
export default ShowDefWithCSS;