# Task Management Project

This project is a Node.js Socket.io server built with Express and TypeScript, following Hexagonal Architecture and using Awilix for Dependency Injection. It employs RabbitMQ as a message broker for asynchronous communication with a HTTP service, uses Mongoose for database operations, and Jest for unit testing.

## Features

- **Hexagonal Architecture**: Organized code into distinct layers for better maintainability and scalability.
- **Awilix**: Dependency Injection container for managing application dependencies.
- **RabbitMQ**: Message broker for asynchronous communication with HTTP service.
- **Jest**: Testing framework for unit testing.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [Events Documentation](#events-documentation)

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   https://github.com/petlight45/task-management-backend-ws.git
   cd task-management-backend-http
   
## Configuration
   
1. **Set up environmental variables**

   ```bash
   cp .env.example .env
 Update the .env file with your local configuration values.
 
 
 EXPRESS_APP_SERVER_PORT=The target port to run this server on
 
 EXPRESS_APP_HTTP_SERVER_PRIVATE_ENDPOINT_SECRET_KEY=The private secret key of this server for synchronous inter-service communication from the HTTP server

 EXPRESS_APP_HTTP_SERVER_BASE_URL=The base endpoint url of the HTTP server

 EXPRESS_APP_RABBIT_MQ_URL= The connection uri to the message queue(Rabbit MQ) used by this server for asynchronous inter-service communication with the HTTP server 
 
 EXPRESS_APP_MESSAGE_QUEUE_NAME=The queue name that binds this server and the HTTP server together, this server sends to this queue, while the WS server reads from it

 
 ## Running the Server
 
 To run the server:
 
 Install docker and docker compose on your operating environment
 
 Run this
 
    ```bash
    docker-compose up --build
    
Or this, in case the above did not work

      ```bash
      docker compose up --build

## Testing
 
 To run the unit tests and integration tests:
 
 Run this
 
    ```bash
    npm install
    npm test
    
    
## Events Documentation
 Events  to listen for; 
 
      ```bash
      notification


  Sample payload 
  
       ```bash
       {"type":"TASK_CREATED","data":{"id":"c0f8ac3f5611137a7cffbe9a","_id":"c0f8ac3f5611137a7cffbe9a","name":"tabula demum absens","assigneeId":"0550f7dbccb2cb02bddbbc2f","dueDate":"Fri Sep 27 2024 05:48:39 GMT+0100 (West Africa Standard
        Time)","state":"contra","description":"Coadunatio coepi vesco torrens. Delicate statua defendo comptus. Substantia vos vorax cras sit quibusdam depromo volaticus.","ownerId":"0550f7dbccb2cb02bddbbc2f","data":{"id":"c0f8ac3f5611137a7cffbe9a","_id":"c0f8ac3f5611137a7cffbe9a","name":"tabula demum absens","assignee
       Id":"0550f7dbccb2cb02bddbbc2f","dueDate":"Fri Sep 27 2024 05:48:39 GMT+0100 (West Africa Standard Time)","state":"contra","description":"Coadunatio coepi vesco torrens. Delicate statua defendo comptus. Substantia vos vorax cras sit quibusdam depromo volaticus.","ownerId":"0550f7dbccb2cb02bddbbc2f"}}}
