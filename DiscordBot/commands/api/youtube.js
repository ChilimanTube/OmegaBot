const Discord = require("discord.js");
const YouTube = require("discord-youtube-api");
const {google} = require('googleapis');
const { config } = require("dotenv");

/* This code is retrieving the YouTube channel ID for the channel with the username "LogicProXGaming"
using the YouTube Data API v3 and storing it in the `youtubeChannelID` variable. It is using the
`googleapis` library to make the API request and passing in the API key for authentication. The
`channels.list` method is used to retrieve the channel ID, and the `forUsername` parameter specifies
the username of the channel to retrieve. The `maxResults` parameter is set to 1 to limit the
response to a single channel. The retrieved channel ID is then stored in the `youtubeChannelID`
variable and printed to the console. If an error occurs during the API request, it is logged to the
console. */
const youtubeChannelID = "";
const youtubeIDRetrieval = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

youtubeIDRetrieval.channels.list({
  part: 'id',
  forUsername: 'LogicProXGaming',
  maxResults: 1
}).then(response => {
  youtubeChannelID = response.data.items[0];
  console.log('Channel ID: ' + channel.id);
}).catch(error => console.log(error));

const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

const channelID = youtubeChannelID;
const roleID = "1117402779087016016";

let latestVideoID = "";

/**
 * The function checks for new videos on a YouTube channel and sends a notification to a Discord text
 * channel if a new video is found.
 */
async function checkForNewVideo() {
  console.log("Checking for new videos...");
  let video = await youtube.getLatestVideo(channelID);

  if (video.id !== latestVideoID) {
    console.log("New video found!");
    let textChannel = client.channels.cache.find(
      (channel) => channel.type === "text"
    );

    if (textChannel) {
      textChannel.send(
        `@${roleID} A new video has been uploaded by ${video.channel.title}: ${video.url}`
      );
    }

    latestVideoID = video.id;
  } else {
    console.log("No new videos found.");
  }
}

/* `module.exports = {checkForNewVideo};` is exporting the `checkForNewVideo` function from the module
so that it can be used in other parts of the codebase. This allows other files to import and use the
`checkForNewVideo` function by requiring the module that exports it. */
module.exports = {checkForNewVideo};