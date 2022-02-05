import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import joi from 'joi';
import router from './routes/index.js';

// const userSchema = joi.object({
//     name: joi.string().required(),
//   });

dotenv.config()
const app = express();
app.use(cors())
app.use(express.json());
app.use(router);

// app.post('/sign-up',(req,res)=>{
//     try{
//         let rest =req.body;
//         console.log(rest)
//         res.sendStatus(201);
//     }catch(error){
//         console.log(error);  
//         res.sendStatus(501);
//     }
// })
app.listen(process.env.PORT,()=>{console.log("Servidor Iniciado na porta - "+process.env.PORT)})

