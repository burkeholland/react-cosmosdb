# React CosmosDB

This is a demo project for the React CosmosDB video series that shows how to...

* Setup a React / Node application
* Create, Read, Update and Delete data from CosmosDB with the Mongo API
* Debug React and Node apps
* Scale and replicate CosmosDB

Follow along with the video series. React is a blast and CosmosDB is crazy fast. Building this app is way too much fun.

## Get Started

1. Clone this repository

```bash
git clone https://github.com/burkeholland/react-cosmosdb.git
```

2. Change into the directory that was cloned and run `npm install`

```bash
cd react-cosmosdb && npm install
```

3. Configure the CosmosDB Server Setting



## Installing

```bash
git clone 'this-repo-url' app-name
cd app-name
npm install
```

## Running The App

The template can be run in development, or in production. For development, use the following workflow.

### Start the Express Server

```bash
node server/server.js
```

### Start Create React App

In a different terminal tab...

```bash
npm start
```

![Imgur](http://i.imgur.com/f7Nlvx4.png)

The "Welcome to React" is a message that comes from the Express server. 

### What Is Happening Here?

Create React App and the Express server are running on different processes. This is so that React can still use in memory Webpack to do hot reloads really fast.

All AJAX/fetch requests to `/api` are sent back to the Express server which is serving all `/api` routes from the `routes/index.js` file. This is done via a proxy setup in the `package.json` file.

## Building For Production

In production, you want Express to serve up your app.

### Build React App

```bash
npm build
```

Now simply visit the Express app at 'http://localhost:3001' and you will see your app served from the 'build' folder. That's all there is to it!
