import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchWords, selectWord } from '../actions/index.js';
import { Search } from 'semantic-ui-react'

class SearchWord extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => {
    this.props.selectWord(null);
    this.setState({ results: [], value: '' })
  }

  handleResultSelect = (e, result) => {
    this.props.selectWord(result.word);
    this.setState({ value: result.word });
  }

  handleSearchChange = (e, value) => {
    this.setState({ value });
    this.props.selectWord(value);
   
    this.props.searchWords({ word: value })
      .then(() => { 
        if (this.state.value.length < 1) return this.resetComponent()
        this.setState({
          results: this.props.words.data.slice(0, 5)
      })
      })

    }
  resultRenderer = ({word}) => {
    return <div key={word+Date()}>{word}</div>
  }

  render() {
    const { value, results } = this.state

    return (
      <Search
        onResultSelect={this.handleResultSelect.bind(this)}
        onSearchChange={this.handleSearchChange}
        results={results}
        resultRenderer={this.resultRenderer}
        value={value}
        {...this.props}
      />
    )
  }
}

function mapStateToProps(state){
  return { words: state.words.results };
}

export default connect(mapStateToProps, { searchWords, selectWord }) (SearchWord);