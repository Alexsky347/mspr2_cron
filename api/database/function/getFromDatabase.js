import {Parking} from "../model/parking-model.js";
import {parserCsv} from "../../../crontab/cron/index.js";
import * as fs from "fs";

export const get = (data) => {
        Parking.findAll({
            where: {name: data},
            raw: true,
        }).then(e => {

        // waitForElement(e)
        console.log("tamereenstringdeguerre" + JSON.stringify(e));

        fs.writeFileSync("media/"+data+".csv", parserCsv(e));

            console.log("Done!");
    }).catch(err => {
        console.log(err)
    })

}
