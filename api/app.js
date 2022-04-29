import Fastify from 'fastify';
import { getCache } from './cache/index.js';


const fastify = Fastify({
  ignoreTrailingSlash: true,
  bodyLimit: 5048576
})

fastify.get('/healthcheck', (request, reply) => {
  return reply.status(200).send();
})

fastify.get('/api/parking', async () => {
  return await getCache(process.env.CACHE_NAME);
})

fastify.listen(process.env.APP_API_PORT, process.env.APP_HOST, 511, async (err, address) => {
  
  if(err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log("Api running on " + address)
  }

})
