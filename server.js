const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB Connection Successful!");
})

const travelsRouter = require('./routes/travel');
const guidesRouter = require('./routes/guide');
const usersRouter = require('./routes/user');
const authRouter = require('./routes/auth');

app.use('/travels', travelsRouter);
app.use('/guides', guidesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});