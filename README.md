# Hello World App

This is a simple Node.js application that returns "Hello World!" on the `/` route.

## Requirements
- Node.js
- Docker
- Jenkins (for CI/CD)

## Running the app locally
1. Install dependencies: `npm install`
2. Run the app: `npm start`
3. Visit `http://localhost:3000` to see the "Hello World!" message.

## Running the app with Docker
1. Build the Docker image: `docker build -t hello-world-app .`
2. Run the Docker container: `docker run -p 3000:3000 hello-world-app`
