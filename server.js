const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

dotenv.config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const profileRoutes = require('./routes/profile');
const actionRoutes = require('./routes/actions');

app.use('/api',authRoutes);
app.use('/api',postRoutes);
app.use('/api',profileRoutes);
app.use('/api',actionRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const dbURI = "mongodb+srv://tarunineti:taruni@cluster0.ve4w2vu.mongodb.net/merngram?retryWrites=true&w=majority";
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port,()=>console.log("server and db started")))
  .catch((err) => console.log(err));