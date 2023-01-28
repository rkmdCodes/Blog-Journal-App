import express from 'express';
import dotenv from 'dotenv';
import connection from './database/db.js';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';



dotenv.config();
const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Router);


const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const PORT=8000;

app.listen(PORT,()=> console.log (`Server is running successfully on Port ${PORT}`));
connection(username,password);