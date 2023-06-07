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

function systemSendChat(message) {
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are Omega, an AI on Discord. When a user sends a message, your task is to extract a command from the message. The only valid commands are: ping, ban, timeout, kick, mute, unmute, help, search. If a command requires parameters, please include them after the command. Interpret the user's intentions and respond with only the correct command and parameters, separated by a space. Respond in this format: <commandName> <parameters>" },
            { "role": "user", "content": message.content }
        ],
        temperature: 0.6
    }).then((data) => {
        console.log("Response data:", data.data);
        console.log("Response choices:", data.data.choices);
        if (data.data.choices && data.data.choices.length > 0) {
            let result = getCommandFromResponse(data.data.choices[0].message);
            console.log("DATA.DATA.CHOICES[0].MESSAGE: " + data.data.choices[0].message);
            if (result.command) {
                executeCommand(result.command, result.parameters, message);
            } else {
                console.log("Command not found");
            }
        } else {
            console.log("No choices in response");
        }
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

function executeCommand(command, parameters, message) {
    if(parameters != null){
        switch (command) {
            case "ban":
                ban(parameters, message);
                break;
            case "timeout":
                timeout(parameters, message);
                break;
            case "kick":
                kick(parameters, message);
                break;
            case "mute":
                mute(parameters, message);
                break;
            case "unmute":
                unmute(parameters, message);
                break;            
            default:
                console.log("Command not found");
                break;
        }
    } else {
        switch (command) {
            case "help":
                help(message);
                break;
            case "ping":
                ping(message);
                break;
            case "search":
                search(message);
                break;
            default:
                console.log("Command not found");
                break;
        }
    }
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

function help(message) {
    message.reply({ embeds: [helpEmbed] });
}

module.exports = { sendChat, systemSendChat };
