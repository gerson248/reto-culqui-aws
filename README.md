# Serverless - AWS Node.js Typescript

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

- **Requirements**: NodeJS
- **Requirements**: Serverless, to install serverless globally execute the following `npm install -g serverless`

### STEPS TO RUN THE PROJECT

- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS
- Run `npm run test:watch` to run the tests in observation mode

### Locally

In order to test the functions locally, run the following command:

- `npm run dev` if you're using NPM

### Environment

Replace in the .env file with your aws credentials

Example

> AWS_ACCESS_KEY_ID=ASIAXAO7PXAK2ACPEBRT
> AWS_SECRET_ACCESS_KEY=7uuB6Qd5HmaQYKblEqWnF3ofco6IUfVQ14J3H7Ga
> AWS_SESSION_TOKEN=IQoJb3JpZ2luX2VjEPn////////...