import { Router } from 'express';
import { dataEnv } from '../config/envData.js';
import bodyParser from "body-parser";
import { getUsers } from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });


const user_create = async (req,res) => {
    const {name,lastname,email,pass} = req.body;
    // const apellido = req.body.apellido;

    getUsers.create ({
        name,
        lastname,
        email,
        pass
    },
    {fields: ["name", "lastname","email","pass"]})
    .then(user => {
        res.send(user);
    })
    .catch((err)=> {
        console.log(err);
    })

};

const user_login = async (req, res) => {
  const user = await getUsers.findOne({ where: { name: req.body.name } });
  if (user) {
      const validPassword = bcryptjs.compareSync(req.body.pass, user.pass);
      
          if (validPassword) {
              const token = jwt.sign({
                  sub: user. name,
                  sub1: user.id
              }, 'secret')
              user.token = token;

              res.header('auth-token', token).json({
                  error: null,
                  data: { token,name: user.name, id: user.id ,validate: user.validate }
              });

          }
          else {
              return res.status(400).json({ error: 'contraseña no válida' })
          }
      
  }
  else {
      return res.status(400).json({ error: 'Usuario no encontrado' });
  }


};

// const user_delete = async (req,res) => {
//     const id = req.query.id;
//     getUsers.destroy({where: {id :id}})
//     .then((r) => {
//         res.status(200).json({ message: "Registro Eliminado" });
//     })
//     .catch((err) => {
//         res.status(400).json({ err: 'Error al eliminar' });    
//     });
// }

const user_viewAll = async (req,res) => {
    getUsers.findAll({ attributes: ["id","name", "lastname","email",]})
    
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(400).json({ err: 'Error al hacer la consulta' });    
    })
  
  }

// const user_update = (req, res) => {
//     const { nombre, apellido} = req.body;
//     const { id } = req.query;
  
//     getUsers.findOne({ where: { id: id } })
//       .then(user => {
//         if (!user) {
//           return res.status(404).send('user not found');
//         }
  
//         user.update({
//           nombre: nombre || user.nombre,
//           apellido: apellido || user.apellido,
//         })
//           .then(updatedUser => {
//             res.send(updatedUser);
//           })
//           .catch(err => {
//             console.log(err);
//             res.status(500).send('Error updating user');
//           });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).send('Error updating user');
//       });
// };

export const userController = {user_create,user_login,user_viewAll};