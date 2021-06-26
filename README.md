[![CI](https://github.com/hessikaveh/microservice-scaffold/actions/workflows/main.yml/badge.svg)](https://github.com/hessikaveh/microservice-scaffold/actions/workflows/main.yml)
# The scaffold for Flask based microservices with JWT authentications
We will create a docker ecosystem:
* One holding our flask app which has a couple of RESTful api endpoints  
* Second one to host the mongodb database 
* A docker image for Prometheus metrics
* And finally a Grafana docker image to show the activity and load

###### To run the docker images you need docker, then simply:
```bash
make build
make run 
```
# Grafana dashboard
The Grafana dashboard then can be found in the following address
```bash
http://localhost:3000/d/_eX4mpl3
```
![Example](grafana03.png)

# Test the endpoints
Using the index.html in the test folder, one can run a couple of tests:
* Signing Up
* Logging in 
* and finally adding items to the database by pressing on the post button  
![Example](webpage.png)