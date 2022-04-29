# change var in start.sh if needed

# redis
docker run -d -p 6379:6379 --name some-redis redislabs/redismod
docker exec -it some-redis sh
docker exec -it mspr_fastify_cache_1 sh
redis-cli
info modules
set name pnap
get name pnap
# start applications
docker run -d -p 6379:6379 --name some-redis redislabs/redismod
bash startCron.sh
bash startApi.sh