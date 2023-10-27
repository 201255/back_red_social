import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";

const comment = getData.sequelizeClient.define('comment', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName : 'comment',
});


export const getComment = comment;