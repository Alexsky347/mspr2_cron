import Fastify from 'fastify';
import { getCache, setCache } from './cache/index.js';
import { cronJob } from './cron/index.js';


const fastify = Fastify({
  ignoreTrailingSlash: true,
  bodyLimit: 5048576
})


fastify.listen(process.env.APP_PORT, process.env.APP_HOST, 511, async (err, address) => {

  setCache('testKey', await cronJob());

  setTimeout( async () => {
    console.log("data => ", await getCache('testKey'))
  }, 1000);
  
  if (!err) {
    console.log("App running on " + address)
  }

  if(err) {
    console.error(err)
    process.exit(1)
  }

})
