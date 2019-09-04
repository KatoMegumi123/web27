const mongoose = require('mongoose');
const HotGirlSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    like:{
        type: Number,
        default: 0,
    },
    dislike:{
        type: Number,
        default: 0,
    },
});

const HotGirlsModel = mongoose.model('HotGirls',HotGirlSchema);

module.exports = HotGirlsModel;