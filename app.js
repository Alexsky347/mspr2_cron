import Fastify from 'fastify';
import { getCache, setCache } from './cache/index.js';
import { cronJob } from './cron/index.js';


const fastify = Fastify({
  ignoreTrailingSlash: true,
  bodyLimit: 5048576
})


fastify.listen(process.env.APP_PORT, process.env.APP_HOST, 511, async (err, address) => {

  cronJob();

  setInterval( async () => {
    console.log("data => ", await getCache('testKey'))
  }, 2000);
  
  if(err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log("App running on " + address)
  }

})
