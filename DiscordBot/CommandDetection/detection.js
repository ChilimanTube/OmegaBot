const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");
const { helpEmbed } = require('../Commands/general/help.js');

const openai = startChat();

//list of possible commands
const commands = ["ban", "timeout", "kick", "mute", "unmute", "help", "ping", "search"];

//list of possible parameters
const parameters = ["user", "time", "reason", "channel", "role", "message", "query"];


function startChat() {
    config();
    const configuration = new Configuration({
        organization: "org-jbSx2APVzulGJyLv0Jn5aJTD",
        apiKey: process.env.OPENAI_API_KEY,
    });
    return new OpenAIApi(configuration);
}

function sendChat(message) {
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord. Try to understand user intentions from their messages and based on their requests return the name and parameters of the command they want to execute." },
            { "role": "user", "content": message.content }
        ],
        temperature: 0.6
    }).then((data) => {
        console.log(data.data);
        message.reply(data.data.choices[0].message)
    }
    ).catch((error) => {
        console.error(error);
    });
}

function getCommandFromResponse(response) {
    let message = response.content;
    let command = null;
    let parameters = [];

    let words = message.split(' ');

    for (let word of words) {
        if (commands.includes(word)) {
            command = word;
        }
        else if (parameters.includes(word)) {
            parameters.push(word);
        }
    }

    return { command, parameters };
}

const faq = "What's Logic's real name? - Chris; What's Logic's guide dog's name? - Krieger, and he is a 6-year-old lab at the time of this posting; Is Logic really blind? - Yes, he is, though he has some sight as you will see in his streams; What visual changes does Logic use? - He uses a texture pack called Easy Blocks that helps remove detail and assist with block separations. He also uses a custom texture pack made by Boom Pixals of our own community that helps with contrast in specific situations; What mods does Logic use? - He uses the Fabric loader along with MAmbiahnce and Accessibility Plus; What is the name of the shaders you use the most? - Nostalgia shaders. Other shaders change too much, and he can't handle a lot of visual input; Are there any other blind players? - Yes, there are. We have been building our roster for 3 years, and we've got around 20 blind players, with a few sighted players helping with visual things and admin duties; Can I be mod? - No, you can't. Generally, if you are asking, you are not at a point that we can be having that talk. Mods have to be proven members of our community who can be trusted to handle things when Logic isn't around; Can I join the server? - The server will be public soon; How old is the server? - This map started 3 years ago as Logic's first survival map. It was uploaded to Realms 2 months later after his other blind friends and some subscribers wanted to play, and it was transferred to its current home in January 2021; What about the flying players? - Blindcraft is a survival SMP. If you see a staff member flying, don't always assume they are in creative as we have access to /fly. If you see a non-staff member non-elytra flying, please message a staff member with that person's username and the day and estimated time of day so it can be handled;";


function sendFaq(interaction) {
    const question = interaction.options.get('question').value;
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord."
            + "Respond to the user's question using the following FAQ. " + faq },
            { "role": "user", "content": question }
        ],
        temperature: 0.6
    }).then((data) => {
        console.log(data.data);
        interaction.reply(data.data.choices[0].message)
    }
    ).catch((error) => {
        console.error(error);
    });
}

function search(message) {
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord, in a community with a lot of users with vision problems. Some of the members have a problem, try to solve it. " },
            { "role": "user", "content": message.content }
        ],
        temperature: 0.6
    }).then((data) => {
        console.log(data.data);
        message.reply(data.data.choices[0].message)
    }
    ).catch((error) => {
        console.error(error);
    });
}



module.exports = { sendChat, search, sendFaq };