import cron from 'node-cron';
import { getAllParking } from '../function/index.js';

export const cronJob = async () => {
    return cron.schedule(process.env.TIME_SCHEDULE, async () => {
        try{
            return await getAllParking();
        } catch(e){
            console.error(e);
        }
    })
}
