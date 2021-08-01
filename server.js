require('dotenv').config({path:"./config.env"})
const express=require('express');
const connectDB=require('./config/db');
const errorHandler=require("./middleware/error")

//connect DB
connectDB();

const app=express();

//this will allow us to take the data from the request body
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/private',require('./routes/private'));

//Error handler should be the last piece of the middleware
app.use(errorHandler);

const PORT=process.env.PORT||5000;

const server=app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

//just for looking an error nicely so we can understand it
process.on("unhandledRejection",(err,promise)=>{
    console.log(`Logged Error: ${err}`);
    server.close(()=>process.exit(1));
})
