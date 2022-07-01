import { getAllParking } from "../function/index.js";
import { setCache } from "../cache/index.js";

export const cronJob = async () => {
  setInterval(async () => {
    setCache(process.env.CACHE_NAME, await getAllParking());
    console.log("cron tab executed");
  }, 50000);
};
