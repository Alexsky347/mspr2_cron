import {getAllParking} from "../function/index.js";
import {setCache} from "../cache/index.js";
import {get} from "../../api/database/function/getFromDatabase.js";
import * as json2csvParser from "json2csv";



export const cronJob = async () => {
    setInterval(async () => {
        let allParkings = await getAllParking()
        setCache(process.env.CACHE_NAME, allParkings);
        for (const key of allParkings) {
            get(key.name)

        }
         await send(allParkings);

        console.log("cron tab executed");
    }, 60000);
};

export function parserCsv(values){

    console.log('testing: '+json2csvParser.parse(values))
    return  json2csvParser.parse(values);
}
