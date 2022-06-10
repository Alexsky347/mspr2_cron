# MSPR big data
## change var in start.sh if needed
## start applications
`docker run -d -p 6379:6379 --name some-redis redislabs/redismod`   
`cd /api`   
`npm i`   
`cd /crontab`   
`npm i` 

`npm i -g nodemon` 

`bash startCron.sh`   
`bash startApi.sh`   

## navigate to http://localhost:8000/api/parking



