
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const userRoutes = require('./routes/v1/userRoutes');
const recipeRoutes = require('./routes/v1/recipeRoutes');
const cookbookRoutes = require('./routes/v1/cookbookRoutes');
const groupRoutes = require('./routes/v1/groupRoutes');
const PORT = process.env.PORT || 8080;


const app = express();

//middlewares
var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	credentials: true
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

//create routers
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/recipe', recipeRoutes);
app.use('/api/v1/cookbook', cookbookRoutes);
app.use('/api/v1/group', groupRoutes);

app.get("/logout", (req, res) => {
	return res
		.clearCookie("Authorization")
		.status(200)
		.json({ message: "Successfully logged out 😏 🍀" });
});

app.use('/', (req, res) => {
	res.sendStatus(200)
})

app.listen(PORT);
console.log('listening on port ', PORT)

//connect to database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI).catch((err) => {
	console.log(err);
});