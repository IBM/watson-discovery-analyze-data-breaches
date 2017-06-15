# Discovery Demo [![Build Status](https://travis-ci.org/nelstrom/discovery-nodejs.svg?branch=byod)](https://travis-ci.org/nelstrom/discovery-nodejs)

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/nelstrom/discovery-nodejs&branch=byod)

In this developer journey you will upload your own data into the Watson Discovery Service. Then you'll configure a web application so that it can query the data collection you created. The web app allows you to explore that data.

Once you are done with this journey you will know how to:

1. Built and run an API server with a HTML frontend written in React
1. Configure Watson Discovery Service with the App
1. Deploy the app to IBM Bluemix using cloudfoundry CLI tool

# Repo Contents

This repo contains code for:

1. Code for a responsive Frontend web application built using React
1. Code for a backend Web and API Server built using express
1. Data to be added to the Watson Discovery Collection

# Getting Started

## Prerequisites

Make sure before you start you have the following tasks done:

1. Install [nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm)
2. Install the [Cloud-foundry CLI](https://github.com/cloudfoundry/cli) tool
3. Have a [Bluemix account](https://console.ng.bluemix.net/registration/)

## Steps

### 1. Clone the repo

Clone the repo by running the following command in the terminal and go into that directory.

```sh
$ git clone https://github.com/nelstrom/discovery-nodejs/
$ cd discovery-nodejs
```

### 2. Install the dependencies

Install all of the dependencies by running `yarn` command.

```sh
$ npm install
```

This will install of the node modules specified in the package.json

### 3. Create Bluemix Services

Create the following services:

* [Watson Discovery](https://console.ng.bluemix.net/catalog/services/discovery?env_id=ibm:yp:us-south)

### 4. Configure Watson Discovery

### 5. Configure the data collection

### 6. Upload data to the collection

![Upload data to collection](readme-images/upload-data.gif)

### 7. Setup environment variables

Create a `.env` file, using the `.env.example` file provided as a template:

```sh
$ cp .env.example .env
```

Open the file in a text editor and you should see something like this:

```
DISCOVERY_USERNAME=<username>
DISCOVERY_PASSWORD=<password>
ENVIRONMENT_ID=<environment>
COLLECTION_ID=<collection>
```

Replace each of the `<placeholder>` values with the credentials that you noted down in previous steps.
After you've done that, load these variables into your shell's environment by running:

```sh
$ export `cat .env`
```

### 8. Run the app locally

Start the app by running:

```sh
$ npm install
```

### 9. Deploy the app

To deploy to Bluemix make sure you have cloud foundry CLI tool installed. Then run the following commands to connect it with Bluemix and login with your Bluemix credentials.

```sh
$ cf api https://api.ng.bluemix.net
$ cf login
```

Then to deploy just run the following command and it will push the code, deploy it to a server and run it.

```sh
$ cf push
```

Go to the URL that is printed at the end after deployment is done and you can view the app.

# Architecture

## Backend Server

Backend server is responsible for server side rendering of the views to be displayed on the browser. It acts as a proxy server, forwarding queries from the frontend to the Watson Discovery Service API while keeping sensitive API keys concealed from the user.

This backend is written using express and uses express-react-views engine to render views written using React.

## Frontend Web App

The frontend uses React to render search results and can reuse all of the views that are used by the backend for server side rendering. The frontend is using watson-react-component and is responsive.
