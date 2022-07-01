import Fastify from "fastify";
import { cronJob } from "./cron/index.js";

const fastify = Fastify({
  ignoreTrailingSlash: true,
  bodyLimit: 5048576,
});

fastify.listen(
  process.env.APP_PORT,
  process.env.APP_HOST,
  511,
  async (err, address) => {
    await cronJob();

    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log("App cron running on " + address);
    }
  }
);
