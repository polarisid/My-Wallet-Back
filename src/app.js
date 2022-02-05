import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

app.get('/',(req,res)=>{console.log("oi"); res.sendStatus(201)})
app.listen(5000)

