import React, { Component } from 'react';

class CreateGameScreen extends Component {

    state = {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
    }

    handlePlayNameChange = (playerNumber, value) => {
        const player = `player${playerNumber}`
        this.setState({
            [player]: value,
        });
    }

    handleFormSubmit = (event)=>{
        event.preventDefault();
        let player1=this.state.player1;
        let player2=this.state.player2;
        let player3=this.state.player3;
        let player4=this.state.player4;
        let playersArr=[player1,player2,player3,player4];
        fetch(`http://localhost:3001/newGames?players=${playersArr}`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            window.location.href=`/games/${data.data.id}`
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    render() {
        return (
            <div className='container'>
                <div>
                    <h1 className='title1'>ScoreKeeper</h1>
                </div>
                <form className='newGameForm'>
                    <div className='Players'>
                        <div className='row'>
                            <textarea style={{ width: '100%', }} 
                            className='player1' 
                            placeholder="Player 1" 
                            required={true} value={this.state.player1} 
                            onChange={(event) => { this.handlePlayNameChange(1, event.target.value); }}></textarea>
                        </div>
                        <div className='row'>
                            <textarea style={{ width: '100%', }} 
                            className='player2' 
                            placeholder="Player 2" 
                            required={true} value={this.state.player2} 
                            onChange={(event) => { this.handlePlayNameChange(2, event.target.value); }}></textarea>
                        </div>
                        <div className='row'>
                            <textarea style={{ width: '100%', }} 
                            className='player3' 
                            placeholder="Player 3" 
                            required={true} value={this.state.player3} 
                            onChange={(event) => { this.handlePlayNameChange(3, event.target.value); }}></textarea>
                        </div>
                        <div className='row'>
                            <textarea style={{ width: '100%', }} 
                            className='player4' 
                            placeholder="Player 4" 
                            required={true} value={this.state.player4} 
                            onChange={(event) => { this.handlePlayNameChange(4, event.target.value); }}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-danger" onClick={this.handleFormSubmit}>Create New Game</button>
                </form>
            </div>
        );
    }
}

export default CreateGameScreen;
