// Include Sequelize module.
import Sequelize from 'sequelize';
import { db } from '../db.js';

// 2nd - columns inside the table
export const Parking = db.define('parking', {

    parking_id:{

        // Sequelize module has INTEGER Data_Type.
        type:Sequelize.INTEGER,

        // To increment parking_id automatically.
        autoIncrement:true,

        // parking_id can not be null.
        allowNull:false,

        // For uniquely identify parking.
        primaryKey:true
    },

    name: { type: Sequelize.STRING, allowNull:false },

    address: { type: Sequelize.STRING, allowNull:false },

    com_name: { type: Sequelize.STRING, allowNull:false },

    latitude: { type: Sequelize.INTEGER, allowNull:false },

    longitude: { type: Sequelize.INTEGER, allowNull:false },

    cost_2h: { type: Sequelize.INTEGER, allowNull:false },

    cost_3h: { type: Sequelize.INTEGER, allowNull:false },

    cost_4h: { type: Sequelize.INTEGER, allowNull:false },

    free: { type: Sequelize.BOOLEAN, allowNull:false },

    total: { type: Sequelize.STRING, allowNull:false },

    status: { type: Sequelize.BOOLEAN, allowNull:false },

    datetime: { type: Sequelize.DATE, allowNull:false },
});
await Parking.sync({ force: true });