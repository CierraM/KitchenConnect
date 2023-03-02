
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

// var whitelist = ['https://kitchen-connect-99f2.onrender.com', 'http://localhost:3000']
// var corsOptions = {
// 	origin: function (origin, callback) {
// 		console.log(origin)
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true)
// 		} else {
// 			callback(new Error('Not allowed by CORS'))
// 		}
// 	},
// 	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// 	credentials: true
// }
//middlewares
var corsOptions = {
	credentials: true,
	origin: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

//create routers
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/recipe', recipeRoutes);
app.use('/api/v1/cookbook', cookbookRoutes);
app.use('/api/v1/group', groupRoutes);

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