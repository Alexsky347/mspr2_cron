import { getAllParking } from "../function/index.js";
import { setCache } from "../cache/index.js";
import { send } from "../../api/database/function/sendToDatabase.js";

export const cronJob = async () => {
  setInterval(async () => {
    let allParkings = await getAllParking()
    setCache(process.env.CACHE_NAME, allParkings);
    await send(allParkings);
    console.log("cron tab executed");
  }, 60*60*1000);
};

