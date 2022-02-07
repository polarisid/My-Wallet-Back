import db from '../db.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
export async function signUp(req, res) {
    const email = (req.body.email).toLowerCase();
    try{
        const userVerification = await db.collection('users').findOne({ email });
        if(userVerification){
            res.status(409).send({message:"Já existe um usuário com este e-mail!"})
        }
        const user = req.body;
        const passwordHash = bcrypt.hashSync(user.password, 10);
        await db.collection('users').insertOne({ ...user,email:user.email.toLowerCase(), password: passwordHash })
        res.sendStatus(201);
    }catch(error){
        console.log(error);
        res.status(501).send({message:"Erro no banco de dados"});
    }
}
export async function signIn(req, res) {
    const {password } = req.body;
    const email = req.body.email.toLowerCase();
    try{
        const user = await db.collection('users').findOne({ email });
        if(!user){
            res.status(404).send({message:"Usuário não encontrado"})
        }
      
        if (user && bcrypt.compareSync(password, user.password)){
            const token = uuid() 
            await db.collection('sessions').insertOne({ token, userId: user._id });
            res.send({token:token, userId:user._id, name:user.name});
        }
        else {
            res.sendStatus(401);
        }       
        
    }catch(error){
        console.log(error);
        res.status(501).send({message:"Erro genérico no banco"});
    }
}