import { createClient } from 'redis';

export const setCache = async (key, value) => {
    try{
        const client = createClient(process.env.REDIS_PORT, "0.0.0.0");
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        await client.json.set(key, '$', value);
    } catch (e) {
        console.error(e);

    } finally{
        // client.quit();
    }
    
    
}