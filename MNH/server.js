const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/minihackathon',{useNewUrlParser: true},(e)=>{
    if(e)
    {
        console.log(e);
        process.exit();
    }
    else{
        const GamesModel = require('./model');
        const app = express();

        app.use(express.static('public'));
        app.use(bodyParser.json());

        app.get('/', (req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/scorekeeper.html'));
        });

        app.get('/newGames',(req,res)=>{
            console.log(req.query);
            var newGame = {
                players,
            }
            var players = req.query.players.split(',');
            newGame.players = [];
            for(let i=0;i<4;i++)
            {
                newGame.players[i] = {};
                newGame.players[i]["name"] = players[i];
                newGame.players[i]["game"] = [];
            }
            GamesModel.create(newGame,(error,data)=>{
                if(error)
                {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                }
                else
                {
                    res.status(201).json({
                        success: true,
                        data: {
                            ...data._doc,
                            id: data._doc._id,
                        },
                    });
                }
            });
        });

        app.get("/games/:gameId", (req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/game-detail.html'));
        });


        app.get("/get-game-detail",(req,res)=>{
            const gameId = req.query.id;
            GamesModel.findById(gameId,(err,data)=>{
                if(err)
                {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }
                else
                {
                    if(!data)
                    {
                        res.status(404).json({
                            success: false,
                            message: "Not found",
                        });
                    }
                    else
                    {
                        res.status(201).json({
                            success: true,
                            data: data,
                        });
                    }    
                }
            });    
        });
        

        app.listen(3000, (error)=>{
            if(error)
            {
                console.log(error);
            }
            else{
                console.log('Dang nghe o cong 3000...');
            }
        });
        
        app.get('/search',(req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/search.html'));
        });

        app.get("/search-by-pattern/:pattern",(req,res)=>{
            const pattern = req.params.pattern;
            QuestionModel.find({"content":{$regex: pattern, $options: 'i'}},(err,docs)=>{
                if(err)
                {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }
                else
                {
                    res.status(201).json({
                        success: true,
                        data: docs,
                    });
                }
            });
        });

        app.put('/update',(req,res)=>{
            console.log(req.body);
            var id = req.body.id;
            var player = req.body.player;
            var round = req.body.round;
            var ketquamoi = req.body.ketquamoi;
            GamesModel.findById(id,(err,data)=>{
                if(err)
                {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }
                else
                {
                    var newData = data._doc;
                    console.log(newData);
                    newData.players[player-1].game[round-1] = Number(ketquamoi);
                    let sum = 0;
                    for(let i of newData.players[player-1].game)
                    {
                        sum += i;
                    }
                    GamesModel.findByIdAndUpdate(id,{$set:{players: newData.players}},(err)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                    });
                    res.status(201).json({
                        success: true,
                        data: sum,
                    });
                }
            })
            
        });
    }
});


