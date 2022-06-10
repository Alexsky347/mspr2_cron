import { createClient } from 'redis';

export const getCache = async (key) => {
    try{
        const client = createClient({host:process.env.REDIS_HOST, port:process.env.REDIS_PORT});
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        const result = await client.json.get(key);
        return result
    } catch(e){
        console.error(e)
    }
}
