require('dotenv').config();
"use strict";

// Basic express setup:
const PORT = 8080;
const express = require("express");

const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path')
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(nodeSassMiddleware({
  src: path.join(__dirname, '../public/styles'),
  dest: path.join(__dirname, '../public/styles'),
  indentedSyntax: false,
  sourceMap: true,
  prefix: '/styles'
}))

let pathcheck = path.join(__dirname, '../public/styles')
console.log(pathcheck);
app.use(express.static(path.join(__dirname, "../public")));
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //route data to datahelper functions
  const DataHelpers = require("./lib/data-helpers.js")(db);
  //route data from data helpers into position for server
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);
  app.listen(process.env.PORT || PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
