import React, { Component } from 'react';

class GameDetailScreeen extends Component {
    state = {
        players: {},
        rounds: [],
    }

    componentWillMount() {
        const pathname = window.location.pathname;
        const pathNameParts = pathname.split('/');
        const gameId = pathNameParts[pathNameParts.length - 1];
        fetch(`http://localhost:3001/get-game-detail?id=${gameId}`)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                var tempRound = [];
                for (let j = 0; j < data.data.players[0].game.length; j++) {
                    tempRound.push([]);
                    for (let i = 0; i < 4; i++) {
                        tempRound[j].push(data.data.players[i].game[j]);
                    }
                }
                this.setState({
                    players: data.data.players.map((value, index) => { return value.name }),
                    rounds: tempRound,
                });
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleButtonClick = (event) => {
        const pathname = window.location.pathname;
        const pathNameParts = pathname.split('/');
        const gameId = pathNameParts[pathNameParts.length - 1];
        fetch(`http://localhost:3001/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: gameId,
            })

        })
            .then((res) => {
                return res.json();
            })
            .then((doc) => {
                console.log(doc);
                this.setState({
                    rounds: [...this.state.rounds, [0, 0, 0, 0]],
                });
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = (player,round,ketquamoi)=>{
        const pathname = window.location.pathname;
        const pathNameParts = pathname.split('/');
        const gameId = pathNameParts[pathNameParts.length - 1];
        fetch(`http://localhost:3001/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: gameId,
                player: player,
                round: round,
                ketquamoi: ketquamoi,
            })

        })
            .then((res)=> {
                return res.json();
            })
            .then((doc)=> {
                console.log(doc);
                this.setState({
                    rounds: this.state.rounds.map((rounds,roundIndex)=>{
                        return rounds.map((players,playerIndex)=>{
                            if(roundIndex === round-1 && playerIndex===player-1)
                                return Number(ketquamoi);
                            else
                                return players;
                        });
                    })
                });
                console.log(this.state.rounds);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    countSum = (player)=>{
        let newSum = 0;
        for(let i=0;i<this.state.rounds.length;i++)
        {
            newSum += this.state.rounds[i][player-1];
        }
        return newSum;
    }

    render() {
        return (
            <div className='container'>
                <h1 className='title2'>ScoreKeeper</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" id='player1'>{this.state.players[0]}</th>
                            <th scope="col" id='player2'>{this.state.players[1]}</th>
                            <th scope="col" id='player3'>{this.state.players[2]}</th>
                            <th scope="col" id='player4'>{this.state.players[3]}</th>
                        </tr>
                        <tr>
                            <th scope="col">Sum of Score</th>
                            <th scope="col" id='player1sum'>{this.countSum(1)}</th>
                            <th scope="col" id='player2sum'>{this.countSum(2)}</th>
                            <th scope="col" id='player3sum'>{this.countSum(3)}</th>
                            <th scope="col" id='player4sum'>{this.countSum(4)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rounds.map((value, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>
                                        <input
                                            style={{ width: '100%', }}
                                            type='number'
                                            value={this.state.rounds[index][0]}
                                            key={[1,index]}
                                            onChange={(event)=>{this.handleChange(1,index+1,event.target.value)}}>
                                        </input>
                                    </td>
                                    <td>
                                        <input
                                            style={{ width: '100%', }}
                                            type='number'
                                            value={this.state.rounds[index][1]}
                                            key={[2,index]}
                                            onChange={(event)=>{this.handleChange(2,index+1,event.target.value)}}>
                                        </input>
                                    </td>
                                    <td>
                                        <input
                                            style={{ width: '100%', }}
                                            type='number'
                                            value={this.state.rounds[index][2]}
                                            key={[3,index]}
                                            onChange={(event)=>{this.handleChange(3,index+1,event.target.value)}}>
                                        </input>
                                    </td>
                                    <td>
                                        <input
                                            style={{ width: '100%', }}
                                            type='number'
                                            value={this.state.rounds[index][3]}
                                            key={[4,index]}
                                            onChange={(event)=>{this.handleChange(4,index+1,event.target.value)}}>
                                        </input>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='row justify-content-center'>
                    <button type="button" id='addRoundBtn' className=" btn btn-outline-danger center" onClick={this.handleButtonClick}>Add Round</button>
                </div>
            </div>
        );
    }
}

export default GameDetailScreeen;