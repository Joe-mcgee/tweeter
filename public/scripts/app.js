/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Create page header content
 *
 * @param Object - individual tweet
 *
 * @return Element
 */
function createHeader(tweetObj) {
  let header = $('<header/>', {
    'class': 'tweet-header'
  });
  let imgBox = $('<div/>', {
    'class': 'image-box'
  });

  let img = $('<img/>', {
    'src': tweetObj['user']['avatars']['small']
  });
  $(imgBox).append(img);

  let title = $('<h2/>', {});
  $(title).append(document.createTextNode(tweetObj['user']['name']));
  let aside = $('<aside/>', {
    'class': 'at'
  });

  $(aside).append(document.createTextNode(tweetObj['user']['handle']));
  $(header).append(imgBox);
  $(header).append(title);
  $(header).append(aside);

  return header;
}

// creates main body of tweet
function createText(tweetObj) {
  let text = $('<p/>', {
    'class': 'text'
  });

  $(text).append(document.createTextNode(tweetObj['content']['text']));
  return text;
}

//takes time tweet was made
//returns difference between now and then in days
function timeElapsed(time) {
  let currentTime = new Date();
  let msCurrTime = currentTime.getTime();
  let ago = msCurrTime - time;
  if (ago < 0) {
    return 0;
  } else {

    let days = Math.floor(ago / 86400000);
    console.log(days);
    return days;
  }
}

function createFooter(tweetObj) {
  let footer = $('<footer/>', {
    'class': 'tweet-footer'
  });
  let date = $('<p/>', {
    'class': 'date'
  });

  let days = timeElapsed(tweetObj['created_at']);
  $(date).append(document.createTextNode(days + ' days ago'));
  $(footer).append(date);
  let options = $('<div/>', {
    'class': 'options'
  });
  let ul = $('<ul/>', {
    'class': 'buttons'
  });

  //uses font-awesome glyphs for flag, retweet and like buttons
  let flag = $('<i class="far fa-flag"/>');
  let retweet = $('<i class="fas fa-retweet"/>');
  let like = $('<span class="far fa-heart"/>');

  let logoButtons = [flag, retweet, like];

  logoButtons.forEach((logo, i) => {
    let li = $('<li/>');
    if (i === 2) {
      $(li).addClass('like')
    }
    $(li).append(logo);
    $(ul).append(li);
  });
  $(options).append(ul);
  $(footer).append(options);
  return footer;
}

//puts all the other functions together for one div
function createTweetElement(tweetObj) {
  let tweet = $('<article/>', {
    'class': 'tweet'
  });

  let header = createHeader(tweetObj);
  $(tweet).append(header);

  let text = createText(tweetObj);
  $(tweet).append(text);

  let footer = createFooter(tweetObj);
  $(tweet).append(footer);

  return tweet;
}

// creates full divs for all tweets
function renderTweets(tweets) {
  tweets.forEach((tweet) => {
    let $tweet = createTweetElement(tweet);
    $('.tweets').append($tweet);
  });

}

/**
 * Fetch Tweets from /tweets page
 */

function loadTweets() {
  $.get('/tweets', function(data) {
    data.reverse();
    renderTweets(data);
  });
}


$(document).ready(function() {
  loadTweets();
});
