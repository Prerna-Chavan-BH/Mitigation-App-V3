const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const mitigation_Routes = require('./routes/mitigationRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

//MitigationRoutes
app.use('/api/mitigation', mitigation_Routes);

//Testing database connection
sequelize
    .authenticate().then(() => {
        console.log('Database connected successfully!');
        sequelize.sync();
    })
    .catch((error) => console.error('Unable to connect with the database', error));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});