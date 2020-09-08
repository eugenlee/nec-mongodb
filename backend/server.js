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

app.use('/travels', travelsRouter);
app.use('/guides', guidesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});