import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";
import { getReaction } from "./reactions.js";
import { getComment } from "./comments.js";

const post = getData.sequelizeClient.define('post',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    texto:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    video:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    audio:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    gif: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
{
    tableName: 'post',
});

post.hasMany(getComment, {foreignKey: 'post_id'})

export const getPost = post;