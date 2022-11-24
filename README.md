# FINAL HOMEWORK

[![Build Status](https://akitsuyoshi.semaphoreci.com/badges/final_bigdata_homework/branches/main.svg?style=shields&key=13af1f99-dbe1-4bf3-9372-ffeebc1af08c)](https://akitsuyoshi.semaphoreci.com/projects/final_bigdata_homework)

This project contains 3 applications and 1 database.

* Basic web application
* Data analyzer
* Data collector
* Database

Single web applications, Basic web app, with two background workers.

## WHITEBOARD ARCHITECTURE

### SYSTEM ARCHITECTURE
![system arch](imgs/system.png "")

### CICD ARCHITECTURE
![cicd arch](imgs/cicd.png "")

## TECH STACK
This codebase is written in Javascript, using express.js library for web servers. The codebase is tested with Jest and supertest and uses npm to build and install the all web applications. Docker is used to containalized sevices, including mongoDB, and apply Semaphore for CI/CD. Once test is finished without any failure on Semaphore, it deploy this containalized app to Heroku.

## GETTING STARTED

### PREREQUISITE

Installed Docker and MongoDB on your local machine, and get them running.

### SETUP
```sh
## In the terminal

# if no output is seen here, please install and run MongoDB then.
> ps -ef | grep mongod | grep -v grep

# if no output here, please install and run docker.
> docker ps

> docker-compose up --build
```

After setup and run the app on local, you will get 3 web apps

- `http://localhost:3000` for basic web app
- `http://localhost:3001` for data analyzer
- `http://localhost:3002` for data collector

### MONITOR METRICS ENDPOINTS
The 2 endpoints below will show the app's condition.

- `http://localhost:3000/health`

    → Returns 200 ok

- `http://localhost:3000/metrics`

    → Returns meaningful metrics given by prometheus

## REFERENCES

- [class starter code](https://github.com/initialcapacity/kotlin-ktor-starter)
- [CI for semaphore](https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application)
- [CD for heloku, semaphore, and mongo Atlas](https://semaphoreci.com/community/tutorials/continuous-deployment-of-a-python-flask-application-with-docker-and-semaphore)