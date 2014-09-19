#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

mongoimport --jsonArray --drop --db $1 --collection users  --file ../../db/users.json
mongoimport --jsonArray --drop --db $1 --collection surveys  --file ../../db/surveys.json
mongoimport --jsonArray --drop --db $1 --collection questions --file ../../db/questions.json
mongoimport --jsonArray --drop --db $1 --collection answers --file ../../db/answers.json

