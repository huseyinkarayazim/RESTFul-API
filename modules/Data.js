const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
    owner: {
        type: mongoose.ObjectId,
        require: false
    },
    RecordId: {
        type: Number,
        require: true,
    },
    username: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,

    },
    password: {
        type: String,
        require: true,

    },

    applicationName: {
        type: String,
        require: true,

    },

    applicationLink: {
        type: String,
    },
    Note: {
        type: String,
    },
    date: {
        type: Date,
        defaul: new Date()
    }
})
module.exports = mongoose.model('Data', AuthSchema)