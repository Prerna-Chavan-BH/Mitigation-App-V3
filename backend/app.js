const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const mitigation_Routes = require('./routes/mitigationRoutes');
const Mitigation = require('./models/mitigationModel');
// const morgan = require('morgan');

const app = express();
const PORT = 3000;

// //use morgan to check log request and error
// app.use(morgan('combined'));

// //using error handler middleware
// app.use((req, res, err, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

app.use(express.static(`${process.cwd()}/build`));
app.use(express.static(`${process.cwd()}/public`));

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true
}));

app.use(bodyParser.json());

//MitigationRoutes
app.use('/', mitigation_Routes);

//Testing database connection
sequelize
    .authenticate().then(() => {
        console.log('Database connected successfully!');
        sequelize.sync({force: true});
    })
    .catch((error) => console.error('Unable to connect with the database', error));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});