import cron from 'node-cron';
import { getAllParking } from '../function/index.js';
import { setCache } from '../cache/index.js';

export const cronJob = () => {
    cron.schedule(process.env.TIME_SCHEDULE, async () => {
        setCache('testKey', await getAllParking());
    })
}
