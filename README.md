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

## with docker
`docker network create mspr`   
`docker-compose  up -d`
# OR

## locally
`docker run -d -p 6379:6379 --name some-redis redislabs/redismod`   
`cd /api`   
`npm i`   
`cd /crontab`   
`npm i` 

`bash startCron.sh`   
`bash startApi.sh`   



