import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";


const reaction = getData.sequelizeClient.define('reaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true

    },
},
{
    tableName: 'reaction',
});



export const getReaction = reaction;