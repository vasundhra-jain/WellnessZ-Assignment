# Title

    Rest API using Nodejs + SQL

## Objective

    Build REST API Endpoints

## Tech Stack

    Backend - NodeJS, ExpressJS
    Database - MySQL

## Completion Instructions

### Functionality

#### Must Have

  - Build a model of posts (with fields: title, desc, tag, image)
  - Create an endpoint to get all posts and it should be configured with the following options: 
    - An option to sort, and paginate the data
    - An option keyword that filters the posts that contains that keyword either in the title or description
    - An option Tag that gives us the posts associated with that particular tag.
  - Create an endpoint that inserts a POST in the posts collection.
    - Upload the image to cloud services( AWS S3, Cloudinary or others...)

#### Nice to Have

  - Deploy the solution into production
  - The code should be clean and maintainable.
  - Share the POSTMAN collection of the same with examples attached to each api(s).
    

### Guidelines to develop a project

#### Must Have

  - Modularize your code
  - Use Middleware for Common tasks
  - Document your code

#### Nice to Have

  - Error Handling
  - Security Practices

### Submission Instructions

#### Must Have

#### Nice to Have

  - Deploy the solution into production
  - Share Postman Collection with attached examples

## Resources

### APIs
  - REGISTER USER API
  - LOGIN USER API
  - GET POSTS API
  - POST POSTS API

### Third-party packages

  - sqlite
  - sqlite3
  - jsonwebtoken
  - nodemon
  - bcrypt