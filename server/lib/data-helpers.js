"use strict";
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweeter').insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweeter").find().toArray((err, res) => {
        callback(null, res);
      });
    },

    addLike: function(name, like, callback) {
      let document = db.collection("tweeter").find({user: {'name': name}})
      db.collection("tweeter").updateOne({});
    }
  };
};
