import { Router } from 'express';
import { dataEnv } from '../config/envData.js';
import { getPost } from '../models/post.js';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import {fileURLToPath} from 'url';
import path from "path";

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const create_post = async (req,res) => {
    const {texto} = req.body;
    const imagen = req.file.originalname;
    const gif = req.file.originalname;
    const user_id = req.query.user_id;

    getPost.create({
        texto,
        imagen,
        user_id
    },
    {fields: ["texto", "imagen","user_id"]})

    .then(user => {
        res.send(user);
    })
    .catch((err)=> {
        console.log(err);
    })
}

const get_post = (function (req,res)  {
    let imagen = req.query.imagen;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let reqP = path.join(__dirname, "../");
    console.log("data"+reqP);

    let ext = imagen.split('.').pop();
    let imgPath = null;

    switch(ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            // imgPath = path.join(reqP, "assets", "image", imagen);
            imgPath = path.join(reqP, "assets", "other", imagen);
            break;
        case 'mp3':
            imgPath = path.join(reqP, "assets", "other", imagen);
            break;
        case 'mp4':
            imgPath = path.join(reqP, "assets", "other", imagen);
            break;
        case 'gif':
            imgPath = path.join(reqP, "assets", "other", imagen);
            break;
        default:
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            return res.end('Extension no soportada');
    }

    fs.access(imgPath, fs.constants.F_OK, err => {
        console.log(`${imgPath} ${err ? "no existe" : "existe"} `);

        if(err){
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            return res.end('404 not found');
        } else {
            fs.readFile(imgPath, function(err,data){
                if(err){
                    res.writeHead(500, {'Content-Type' : 'text/plain'});
                    return res.end('Error interno del servidor');
                }else{
                    let contentType;
                    switch(ext) {
                        case 'jpg':
                        case 'jpeg':
                            contentType = 'image/jpeg';
                            break;
                        case 'png':
                            contentType = 'image/png';
                            break;
                        case 'mp3':
                            contentType = 'audio/mpeg';
                            break;
                        case 'mp4':
                            contentType = 'video/mp4';
                            break;
                        case 'gif':
                            contentType = 'image/gif';
                            break;
                    }

                    res.writeHead(200, {'Content-Type' : contentType});
                    res.write(data);
                    return res.end();
                }
            });
        }
    });
});

const viewAll = async (req,res) => {
    getPost.findAll({ attributes: ["id", "texto","imagen"]})
  
    .then(post => {
        res.send(post)
    })
    .catch(err => {
        res.status(400).json({ err: 'Error al hacer la consulta' });    
    })
}


export const postController = {create_post,get_post,viewAll};