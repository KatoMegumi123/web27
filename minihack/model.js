const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    players: {
        type: [],
        required: true,
    },
});

const QuestionModel = mongoose.model('Games',QuestionSchema);

module.exports = QuestionModel;