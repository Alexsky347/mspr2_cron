import cron from 'node-cron';
import { getAllParking, getParkingPlace } from '../function/index.js';
import { setCache } from '../cache/index.js';

export const cronJob = async () => {
    cron.schedule(process.env.TIME_SCHEDULE, async () => {
        setCache(process.env.CACHE_NAME, await getAllParking());
        console.log('cron tab executed');
    })
}
