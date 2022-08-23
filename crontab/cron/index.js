import {getAllParking, makeObj} from "../function/index.js";
import {setCache} from "../cache/index.js";
import {get} from "../../api/database/function/getFromDatabase.js";
import * as json2csvParser from "json2csv";
import {sendToBDD} from "../../api/database/function/sendToDatabase.js"

let index = 1;
export const cronJob = async () => {
    setInterval(async () => {
        if (index<31){
            try {
                let obj = makeObj(index)
                sendToBDD(obj);
                index++
            } catch (error) {
                console.log(error);
            }

        }
        // let allParkings = await getAllParking()
        // setCache(process.env.CACHE_NAME, allParkings);
        // for (const key of allParkings) {
        //     get(key.name)
        // }
        // sendToBDD(allParkings);

        console.log("cron tab executed");
    }, 3000);
};

export function parserCsv(values) {
    return json2csvParser.parse(values);
}
