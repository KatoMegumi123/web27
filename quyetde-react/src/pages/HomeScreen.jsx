import React, { Component } from 'react';

class CreateGameScreen extends Component {

    state = {
        questionId: '',
        content: '',
        like: 0,
        dislike: 0,
    }

    componentWillMount() {
        fetch(`http://localhost:3001/vote`)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    content: data.data.content,
                    questionId: data.data._id,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    Like = (event)=>{
        fetch(`http://localhost:3001/vote/${this.state.questionId}/like`,{
            method: 'PUT',
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            window.location.href = `/questions/${this.state.questionId}`;
        })
        .catch((error)=>{
            console.log(error);
            window.alert(error.message);
        });
    }

    Dislike = (event)=>{
        fetch(`http://localhost:3001/vote/${this.state.questionId}/dislike`,{
            method: 'PUT',
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            window.location.href = `/questions/${this.state.questionId}`;
        })
        .catch((error)=>{
            console.log(error);
            window.alert(error.message);
        });
    }

    AnotherQuestion = (event)=>{
        fetch(`http://localhost:3001/vote`)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    content: data.data.content,
                    questionId: data.data._id,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    QuestionDetail = (event)=>{
        window.location.href = `/questions/${this.state.questionId}`;
    }

    render() {
        return (
            <div className='container'>
                <div className="row justify-content-center">
                    <h1>{this.state.content}</h1>
                </div>
                <div className="row justify-content-around d-flex flex-row">
                    <button className="btn btn-info btn-lg" onClick={this.Like}>Like</button>
                    <button className="btn btn-danger btn-lg" onClick={this.Dislike}>Dislike</button>
                </div>
                <div className="row justify-content-center d-flex flex-row">
                    <button className="btn btn-secondary" onClick={this.AnotherQuestion}>Câu hỏi khác</button>
                    <button className="btn btn-secondary" onClick={this.QuestionDetail}>Kết quả vote</button>
                </div>
            </div>
        );
    }
}

export default CreateGameScreen;
