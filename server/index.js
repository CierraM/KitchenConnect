
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/v1/userRoutes');
const recipeRoutes = require('./routes/v1/recipeRoutes');
const cookbookRoutes = require('./routes/v1/cookbookRoutes');
const groupRoutes = require('./routes/v1/groupRoutes');

const PORT = process.env.PORT || 8080;

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

//create routers
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/recipe', recipeRoutes);
app.use('/api/v1/cookbook', cookbookRoutes);
app.use('/api/v1/group', groupRoutes);

//swagger docs

//wildcard - serve index.html
app.use('*', (req, res, next) => {
    res.sendFile('../build/index.html')
})

const server = app.listen(PORT);
console.log('listening on port ', PORT)

//connect to database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI).catch((err) => {
	console.log(err);
});