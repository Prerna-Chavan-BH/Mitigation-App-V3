const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const mitigation_Routes = require('./routes/mitigationRoutes');

const app = express();

const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true
}));

//converts the text based json inputs into js-accessible variables under req.body 
app.use(bodyParser.json());
//does same thing for the url-encoded requests. extended true= contains obj of nay type instead of just strings 
app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next) => {
    // console.log("Request body: ", req.body);
    // console.log("Request header: ", req.headers);
    next();
})

//using error handler middleware
app.use((req, res, err, next) => {
    console.error(err.stack);
    res.status(500).send({message: 'Internal server error from bkend', error: err.message});
});

app.use(express.json());

//MitigationRoutes
app.use('/api', mitigation_Routes);

//Testing database connection
sequelize
    .authenticate().then(() => {
        console.log('Database connected successfully!');
        // sequelize.sync({force: true});
    })
    .catch((error) => console.error('Unable to connect with the database', error));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});