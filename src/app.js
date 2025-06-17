const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connectDb = require('./config/db');
require('dotenv').config();

const app = express();

connectDb();

app.use(cors({origin : process.env.CLIENT_URL}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', routes);

app.use( (req, res) => {
    res.status(404).json({error : 'Not found'});
})


module.exports = app;