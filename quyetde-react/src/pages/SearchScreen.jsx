import React, { Component } from 'react';
import QuestionItem from '../Components/QuestionItem'

class SearchScreen extends Component {

  state = {
    inputValue: '',
    results: [],
  }

  handleInputChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      inputValue: newValue,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/search-by-pattern/${this.state.inputValue}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          results: data.data.map((value, index) => {
            return { content: value.content, questionId: value._id }
          })
        })
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Enter a pattern to search</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            ></input>
          <button type="button" onClick={this.handleSubmit}>Search</button>
        </form>
        <div className='result'>
          {this.state.results.map((value, index) => {
            return (
              <QuestionItem questionId={value.questionId} content={value.content} key={index} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchScreen;