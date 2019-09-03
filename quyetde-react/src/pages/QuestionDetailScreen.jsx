import React, { Component } from 'react';

class QuestionDetailScreen extends Component {

  state = {
    questionId: '',
    content: '',
    like: 0,
    dislike: 0,
  }

  componentWillMount() {
    const pathName = window.location.pathname;
    const pathNameParts = pathName.split('/');
    const questionId = pathNameParts[pathNameParts.length - 1];
    fetch(`http://localhost:3001/get-question-by-id/${questionId}`)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          content: data.data.content,
          like: data.data.like,
          dislike: data.data.dislike,
          questionId: data.data._id,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  calculateLikeDislike = () => {
    if (this.state.like + this.state.dislike === 0) {
      return ['50%', '50%'];
    }
    else {
      let like = `${this.state.like / (this.state.like + this.state.dislike) * 100}%`;
      let dislike = `${this.state.dislike / (this.state.like + this.state.dislike) * 100}%`;
      return [like, dislike];
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="text-center">{this.state.content}</h1>
        </div>
        <div className="row justify-content-center">
          <p className="text-center">Số lượt vote: {this.state.like+this.state.dislike}</p>
        </div>
        <div className="row justify-content-around d-flex flex-row">
          <div 
          style={{ backgroundColor: 'blue', color: 'white', width: this.calculateLikeDislike()[0] }} 
          className="text-center">
            {this.state.like}
          </div>
          <div 
          style={{ backgroundColor: 'red', color: 'white', width: this.calculateLikeDislike()[1] }} 
          className="text-center">
            {this.state.dislike}
          </div>
        </div>
        <div className="row justify-content-center">
          <div><a href="/"><button>Cau hoi khac</button></a></div>
        </div>
      </div>
    );
  }
}

export default QuestionDetailScreen;