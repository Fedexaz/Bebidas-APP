require('dotenv').config();
const { connect } = require('mongoose');

connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.r9f6m.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))