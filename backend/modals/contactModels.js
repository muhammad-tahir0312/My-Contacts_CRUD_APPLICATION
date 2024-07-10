const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // referencing User model by user_id field
        required: true
    },
    name: {
        type: String,
        required: [true, "Please add contact's name"]
    },
    email: {
        type: String,
        required: [true, "Please add contact's name"]
    },
    phone: {
        type: String,
        required: [true, "Please add contact's name"]
    }
},
{
    Timestamp: true,
})

module.exports = mongoose.model('Contact', contactSchema)