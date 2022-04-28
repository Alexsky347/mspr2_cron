import { createClient } from 'redis';

export const getCache = async (key) => {
    const client = createClient(process.env.REDIS_PORT, process.env.REDIS_URL);
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    const value = await client.get(key);
    client.disconnect();
    return value
}

export const setCache = async (key, value) => {
    const client = createClient(process.env.REDIS_PORT, process.env.REDIS_URL);
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.set(key, value);
    client.disconnect();
}