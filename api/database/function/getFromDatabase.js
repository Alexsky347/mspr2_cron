import {Parking} from "../model/parking-model.js";
import {parserCsv} from "../../../crontab/cron/index.js";
import * as fs from "fs";

export const get = (name) => {
        Parking.findAll({
            where: {name: name},
            raw: true,
        }).then(data => {
        fs.writeFileSync("media/"+name+".csv", parserCsv(data));

            console.log("Done!");
    }).catch(err => {
        console.log(err)
    })
}
