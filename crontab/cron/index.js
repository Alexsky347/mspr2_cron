import {getAllParking} from "../function/index.js";
import {setCache} from "../cache/index.js";
import {send} from "../../api/database/function/sendToDatabase.js";
import {csvCreater, index, names} from "../function/csv.js";
import {get} from "../../api/database/function/getFromDatabase.js";

export const cronJob = async () => {
    setInterval(async () => {
        let allParkings = await getAllParking()
        setCache(process.env.CACHE_NAME, allParkings);
        for (const key of allParkings) {
            await get(key.name).then((tst)=>{
                index(tst)
            });
        }

        // await send(allParkings);

        console.log("cron tab executed");
    }, 10000);
};

