import { Router } from 'express';
import { dataEnv } from '../config/envData.js';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import {fileURLToPath} from 'url';
import path from "path";
import { getReaction } from '../models/reactions.js';

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const reaction_create = async (req,res) => {
    const {user_id, post_id} = req.query;

    getReaction.create({
        user_id,
        post_id
    },
    {fields: ["user_id", "post_id"]})

    .then(user => {
        res.send(user);
    })
    .catch((err)=> {
        console.log(err);
    })
}

const reaction_delete = async (req,res) => {
    const {user_id, post_id} = req.query;

    getReaction.destroy({where: {user_id:user_id, post_id:post_id}})
    .then((r) => {
        res.status(200).json({ message: "Registro Eliminado" });
    })
    .catch((err) => {
        res.status(400).json({ err: 'Error al eliminar' });    
    });
}

export const reactionController = {reaction_create,reaction_delete};