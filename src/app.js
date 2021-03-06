import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import router from './routes/index.js';

dotenv.config()
const app = express();
app.use(cors())
app.options('*', cors())
app.use(express.json());
app.use(router);

app.listen(process.env.PORT,()=>{console.log("Servidor Iniciado na porta - "+process.env.PORT)})

