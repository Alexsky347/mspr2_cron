APP_PORT=5000 \
APP_HOST=localhost \
TIME_SCHEDULE="*/5 * * * * *" \
REDIS_PORT=6379 \
REDIS_HOST=127.0.0.1 \
CACHE_NAME=testKey \
URL_PARKING_FR="https://public.opendatasoft.com/api/records/1.0/search/?dataset=mobilityref-france-base-nationale-des-lieux-de-stationnement&q=&facet=user_type&facet=dep_name&facet=reg_name&facet=dep_code&facet=reg_code&rows=1000&pretty_print=true&start=0" \
URL_PARKING_MTP="https://data.montpellier3m.fr/sites/default/files/ressources/" \
nodemon crontab/app.js