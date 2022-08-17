import {Parking} from "../model/parking-model.js";

export const send = async (allParkings) => {
    Parking.bulkCreate(allParkings, { validate: true }).then(() => {
    }).catch((err) => { console.log(err); });
}
