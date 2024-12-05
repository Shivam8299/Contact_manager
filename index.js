const express = require('express');
const connectDb = require('./db/dbConnection');
const validateToken = require('./middlewares/jwtTokenValidater');

require('dotenv').config()

const app = express();

app.use(express.json())
app.use("/api/contacts",require('./routes/contactRoutes'))
app.use("/api/users",require('./routes/userRouter'))
app.use(validateToken)

// connecting to database 
connectDb()

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is listing on port no ${port}`)
})