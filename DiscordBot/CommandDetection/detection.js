const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");

const openai = startChat();

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

function systemSendChat(query) {
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord. Try to understand user intentions from their messages and based on their requests return the name and parameters of the command they want to execute. Your response can only be the following: ping, ban, timeout, kick, mute, unmute, help, ping, search. If the command needs parameters, include them after the name of the command." },
            { "role": "user", "content": query }
        ],
        temperature: 0.6
    }).then((data) => {
        console.log(data.data);
        executeCommand(data.data.choices[0].message.split(" ")[0], data.data.choices[0].message.split(" ").slice(1));
    }
    ).catch((error) => {
        console.error(error);
    });
}

//list of possible commands
const commands = ["ban", "timeout", "kick", "mute", "unmute", "help", "ping", "search"];

//list of possible parameters
const parameters = ["user", "time", "reason", "channel", "role", "message", "query"];

function executeCommand(command, parameters) {
    if(parameters != null){
        switch (command) {
            case "ban":
                ban(parameters);
                break;
            case "timeout":
                timeout(parameters);
                break;
            case "kick":
                kick(parameters);
                break;
            case "mute":
                mute(parameters);
                break;
            case "unmute":
                unmute(parameters);
                break;
            case "search":
                search(parameters);
                break;
            default:
                console.log("Command not found");
                break;
        }
    } else {
        switch (command) {
            case "help":
                help();
                break;
            case "ping":
                ping();
                break;
            default:
                console.log("Command not found");
                break;
        }
    }
}

function search(query) {
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord, in a community with a lot of users with vision problems. Try to " },
            { "role": "user", "content": query }
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


module.exports = { sendChat };
