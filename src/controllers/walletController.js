import db from '../db.js';
import {ObjectId} from "mongodb";
import walletRouter from '../routes/walletRouter.js';
export async function entry(req,res){
    try{
        let userid=new ObjectId(req.headers.userid);
        let token = req.headers.authorization.substring(7, req.headers.authorization.length);
        const userVerification = await db.collection('users').findOne({_id:userid}); //aqui vamos pesquisar se existe um usuario com este id
        const tokenveirification = await db.collection('sessions').findOne({$and: [{token},{userId:userid}]})
        if(userVerification && tokenveirification){
            let {name,date,type,value}= req.body;
            const bodyVerification = await db.collection('wallet').findOne({$and:[{name},{date},{type},{value}] });
            if(bodyVerification){res.status(409).send({message:"Já existe uma entrada igual a esta"});return}
            await db.collection('wallet').insertOne({ ...req.body, userId:userid });
            res.sendStatus(201)
        }
        else{
            res.status(412).send({message:"Usuario ou Token não encontrado logue novamente!"})
            return
        }

    
    }catch(erro){
        res.status(501).send({message:"erro interno"})
    }
}

export async function getItems(req,res){
    try{
    let token = req.query.token;
    let userid = new ObjectId(req.query.userid);
    const userVerification = await db.collection('users').findOne({_id:userid}); 
    const tokenveirification = await db.collection('sessions').findOne({$and: [{token},{userId:userid}]})
    if(userVerification && tokenveirification){
        let wallet = await db.collection('wallet').find({userId:userid}).toArray()
        console.log(wallet)
        res.send(wallet);
    }
    }catch(e){
        console.log(e);
        res.sendStatus(501);
    }
    
}