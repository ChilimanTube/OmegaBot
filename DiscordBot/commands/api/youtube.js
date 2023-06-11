const Discord = require("discord.js");
const YouTube = require("discord-youtube-api");
const {google} = require('googleapis');

const youtubeChannelID = "";
const youtubeIDRetrieval = google.youtube({
  version: 'v3',
  auth: "AIzaSyBI12APBVrpc2MqAJ9oTMI0_MEa5-yvcuY"
});

youtubeIDRetrieval.channels.list({
  part: 'id',
  forUsername: 'LogicProXGaming',
  maxResults: 1
}).then(response => {
  youtubeChannelID = response.data.items[0];
  console.log('Channel ID: ' + channel.id);
}).catch(error => console.log(error));

  // Require the discord.js and discord-youtube-api modules

// Create a new client and a new YouTube object
const youtube = new YouTube("AIzaSyBI12APBVrpc2MqAJ9oTMI0_MEa5-yvcuY");

// Define the channel ID and the role ID for the bot
const channelID = youtubeChannelID;
const roleID = "1117402779087016016";

// Define a variable to store the latest video ID
let latestVideoID = "";

// Create a function to check for a new video every 5 minutes
async function checkForNewVideo() {
  console.log("Checking for new videos...");
  // Get the latest video from the channel
  let video = await youtube.getLatestVideo(channelID);

  // If the video ID is different from the stored one, post a URL to it
  if (video.id !== latestVideoID) {
    console.log("New video found!");
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
  } else {
    console.log("No new videos found.");
  }
}

module.exports = {checkForNewVideo};