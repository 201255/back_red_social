import { Router } from 'express';
import { dataEnv } from '../config/envData.js';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import {fileURLToPath} from 'url';
import path from "path";
import { getComment } from '../models/comments.js';

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });


const comment_create = async (req,res) => {
    const {name,comment} = req.body;
    const post_id = req.query.post_id

    getComment.create({
        name,
        comment,
        post_id
    },
    {fields : ["name","comment","post_id"]})

    .then(comment => {
        res.send(comment);
    })
    .catch((err)=> {
        console.log(err);
    })
};


const view = async (req,res) => {

    getComment.findAll({where: {post_id: req.query.post_id},
        attributes: ["name", "comment"]})

    .then(comment => {
        res.send(comment)
    })
    .catch(err => {
        res.status(400).json({ err: 'Error al hacer la consulta' });    
    })
};

export const commentController = {comment_create,view};