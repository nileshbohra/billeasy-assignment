require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
// const sequelize = require('./db/config/dbConnector');
const routes = require('./routes/routes');

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
})
