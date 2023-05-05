// Load the YouTube API client library
gapi.load('client', function() {
    // Set the API key
    gapi.client.setApiKey('YOUR_API_KEY_HERE');
    // Load the YouTube API
    gapi.client.load('youtube', 'v3', function() {
      // Set the channel ID of the channel you want to track
      var channelId = 'CHANNEL_ID_HERE';
      // Set the playlist ID of the uploads playlist for the channel
      var playlistId = 'UU' + channelId.substring(2);
      // Retrieve the latest video from the uploads playlist
      gapi.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 1
      }).then(function(response) {
        // Extract the video ID and construct the video link
        var videoId = response.result.items[0].snippet.resourceId.videoId;
        var videoLink = 'https://www.youtube.com/watch?v=' + videoId;
        console.log(videoLink);
        // Do something with the video link, such as display it on a web page
      }, function(error) {
        console.error(error);
      });
    });
  });
  

  // Load the YouTube API client library
gapi.load('client', function() {
    // Set the API key
    gapi.client.setApiKey('YOUR_API_KEY_HERE');
    // Load the YouTube API
    gapi.client.load('youtube', 'v3', function() {
      // Set the username of the channel you want to track
      var username = 'LogicProXGaming';
      // Retrieve the channel ID for the username
      gapi.client.youtube.channels.list({
        part: 'id',
        forUsername: username,
        maxResults: 1
      }).then(function(response) {
        // Extract the channel ID
        var channelId = response.result.items[0].id;
        console.log(channelId);
        // Do something with the channel ID
      }, function(error) {
        console.error(error);
      });
    });
  });

//-------------------------------------------------------
  // Require the discord.js and discord-youtube-api modules
const Discord = require("discord.js");
const YouTube = require("discord-youtube-api");

// Create a new client and a new YouTube object
const client = new Discord.Client();
const youtube = new YouTube("your-youtube-api-key");

// Define the channel ID and the role ID for the bot
const channelID = "your-channel-id";
const roleID = "your-role-id";

// Define a variable to store the latest video ID
let latestVideoID = "";

// Create a function to check for a new video every 5 minutes
async function checkForNewVideo() {
  // Get the latest video from the channel
  let video = await youtube.getLatestVideo(channelID);

  // If the video ID is different from the stored one, post a URL to it
  if (video.id !== latestVideoID) {
    // Find a text channel to send the message
    let textChannel = client.channels.cache.find(
      (channel) => channel.type === "text"
    );

    // If the text channel exists, send the message
    if (textChannel) {
      textChannel.send(
        `@${roleID} A new video has been uploaded by ${video.channel.title}: ${video.url}`
      );
    }

    // Update the stored video ID
    latestVideoID = video.id;
  }
}