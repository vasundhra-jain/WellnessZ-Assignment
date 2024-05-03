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
  - Create a public Github Repository for the assignment
  - Share the recorded Video of the assignment

#### Nice to Have

  - Deploy the solution into production
  - Share Postman Collection with attached examples

## Resources

### Links
  - Postman Collection Link-> https://www.postman.com/altimetry-specialist-38974868/workspace/my-workspace/collection/34670579-91911a00-ba63-4895-bb07-186a71753b47?action=share&creator=34670579 

  - Video Recording Link -> https://drive.google.com/file/d/1D5bPIRhVSf4pMJh8I2YA7M3hodBAVNbH/view
  - Github Repository Link -> https://github.com/vasundhra-jain/WellnessZ-Assignment

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