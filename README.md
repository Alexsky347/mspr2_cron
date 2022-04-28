# change var in start.sh if needed

# redis
docker run -p 6379:6379 --name some-redis -d redis
docker exec -it some-redis sh
redis-cli
set name pnap
get name pnap