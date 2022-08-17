import {Parking} from "../model/parking-model.js";

export const get = async (data) => {
    await Parking.findAll({
        where: { name: data }
    }).then(value =>{
        return  value
    } )

}