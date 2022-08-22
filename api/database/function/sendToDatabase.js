import {Parking} from "../model/parking-model.js";

export const sendToBDD = (allParkings) => {
    Parking.bulkCreate(allParkings, { validate: true }).then(() => {
    }).catch((err) => { console.log(err); });
}
