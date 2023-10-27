import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import { getPost } from "./post.js";
import { getReaction } from "./reactions.js";

const users = getData.sequelizeClient.define('users',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    tableName: 'users',
    freezeTableName: true,
        hooks: {
         beforeCreate: (user, options) => {
             user.pass = user.pass && user.pass != "" ? bcrypt.hashSync(user.pass, 10): "";    
         }
        }
});

users.hasMany(getPost, {foreignKey: 'user_id'})
users.hasMany(getReaction, {foreignKey: 'user_id'})

export const getUsers = users;