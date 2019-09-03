import React, { Component } from 'react';

class CreatQuestionScreen extends Component {
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
        fetch('http://localhost:3001/create-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionContent: this.state.inputValue,
            }),
        })
            .then((response) => {
                // response.json() only when server reponse with json
                // response.text() only when server response with string
                return response.json();
            })
            .then((data) => {
                // xu ly response data
                window.location.href = `/questions/${data.data.id}`;
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="exampleFormControlTextarea1" style={{ fontSize: '2em' }} class="font-weight-bold">Nhập câu hỏi</label>
                        <textarea
                            className="form-control question"
                            maxlength="200"
                            rows="6"
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}>
                        </textarea>
                    </div>
                    <div className="row" id="w-counter">
                        Còn lại {200 - this.state.inputValue.length}/200
                    </div>
                    <div className="row">
                        <input type="submit" class="submit-button" onClick={this.handleSubmit}></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatQuestionScreen;