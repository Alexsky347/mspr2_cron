import { createClient } from "redis";

export const setCache = async (key, value) => {
  try {
    console.log(process.env.REDIS_HOST);
    const client = createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });
    client.on("error", (err) => console.error("Redis Client Error", err));
    await client.connect();
    await client.json.set(key, "$", value);
  } catch (e) {
    console.error(e);
  }
};
