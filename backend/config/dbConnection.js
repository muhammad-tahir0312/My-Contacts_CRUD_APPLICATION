const mongoose = require('mongoose');
const connectionDB = async (req, res, next) => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING || "mongodb+srv://admin:admin@firstcrudapplication.ydken3o.mongodb.net/mycontacts-backend?retryWrites=true&w=majority&appName=FirstCRUDapplication")
        console.log('Database connected', '\nDatabase Host: ', connect.connection.host, 'Database connection name: ', connect.connection.name)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectionDB;