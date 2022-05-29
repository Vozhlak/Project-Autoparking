require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index.routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const path = require('path');

const PORT = process.env.SERVER_PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));

//Маршруты по приложению
app.use('/api', router);


//Обработчик ошибок
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch(err) {
    console.log(err);
  }
}

start();

