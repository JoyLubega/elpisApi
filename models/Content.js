var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ContentSchema = new Schema({

    caption: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
    }
);
const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
