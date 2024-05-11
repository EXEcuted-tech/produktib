require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');

//Routes
const taskRoutes = require('./routes/taskRoutes')
const catRoutes = require('./routes/categoryRoutes')

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET","POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const allowedOrigins = [process.env.CORS_ORIGIN];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());
app.use('/category',catRoutes);
app.use('/task',taskRoutes);  

module.exports = app;