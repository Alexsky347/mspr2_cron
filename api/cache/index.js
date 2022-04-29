import { createClient } from 'redis';

export const getCache = async (key) => {
    try{
        const client = createClient(process.env.REDIS_PORT, process.env.REDIS_URL);
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        const result = await client.json.get(key);
        return result
    } catch(e){
        console.error(e)
    }
}
