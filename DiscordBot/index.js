const path = require('path');
const fs = require('node:fs');
const { Client, GatewayIntentBits, Partials, Events, SlashCommandBuilder, Collection, VoiceChannel } = require('discord.js');
const {token, clientId, clientKey, prefix} = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { helpEmbed } = require('./Commands/general/help.js');
const { createRoom } = require('./commands/lfg/create-room');
const fetch = require('fetch-ponyfill')().fetch;
const { Transform } = require('stream');
const { log } = require('node:console');
const toBuffer = require('typedarray-to-buffer');
const { generateDependencyReport } = require('@discordjs/voice');
const { sendInteractionChat, sendFaq, sendRules, sendAnswer, createVCInvite } = require('./commands/general/gpt.js');


/*
TODO_LIST:
- Add a command to create a room
- Add a command to invite the user to the created room
- Natural Language FAQ --> DONE
- Natural Language rules --> DONE
- Code cleanup
- Host the bot on a server along with the website
- Maybe make the YouTube API work + Twitter API
- Website bot interaction counter + custom API for the website + database
*/




const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    ], partials: [Partials.Channel]
});

client.commands = new Collection(); 

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const activityName = ["DO NOT USE, BOT IS IN DEVELOPMENT"];
    client.user.setPresence({
        activities: [{
            name: activityName[Math.floor(Math.random() * activityName.length)],
            type: 3
         }],
        status: 'online'        
    });

    // General Commands

    client.application.commands.create({
        name: 'ping',
        description: 'Replies with Pong!',
    });

    client.application.commands.create({
        name:'help',
        description: 'User Guide',
    });

    client.application.commands.create({
        name:'get-id',
        description: 'Retrieves YouTube Channel ID - DEVELOPMENT ONLY',
    });

    client.application.commands.create({
        name:'faq',
        description: 'Responds with a list of frequently asked questions using Natural Language Processing',
        options: [
            {
                name: 'question',
                type: 3,
                description: 'The question you want to ask',
                required: true,
            }
        ]
    });

    client.application.commands.create({
        name:'rules',
        description: 'Responds with a list of the server rules using Natural Language Processing',
        options: [
            {
                name: 'question',
                type: 3,
                description: 'The question you want to ask',
                required: false,
            }
        ]
    });

    client.application.commands.create({
        name:'ask',
        description: 'Answers your question',
        options: [
            {
                name: 'question',
                type: 3,
                description: 'The question you want to ask',
                required: true,
            }
        ]
    });

    // Utility Commands

    client.application.commands.create({
        name:'ban',
        description: 'Bans a user',
        options: [
            {
                name: 'user',
                type: 6,
                description: 'The user you want to ban',
                required: true,
            },
            {
                name: 'reason',
                type: 3,
                description: 'The reason for the ban',
                required: false,
            }
        ]
    });

    client.application.commands.create({
        name:'kick',
        description: 'Kicks a user',
        options: [
            {
                name: 'user',
                type: 6,
                description: 'The user you want to kick',
                required: true,
            },
            {
                name: 'reason',
                type: 3,
                description: 'The reason for the kick',
                required: false,
            }
        ]
    });
    
    client.application.commands.create({
        name:'timeout',
        description: 'Timeouts a user',
        options: [
            {
                name: 'user',
                type: 6,
                description: 'The user you want to timeout',
                required: true,
            },
            {
                name: 'duration',                
                type: 4,
                description: 'Duration of the timeout in minutes (1-60, 0 to infinite)',
                required: true,
            },
            {
                name: 'reason',
                type: 3,
                description: 'The reason for the timeout',
                required: false,
            }
        ]
    });

    client.application.commands.create({
        name:'remove-timeout',
        description: 'Removes a timeout from a user',
        options: [
            {
                name: 'user',
                type: 6,
                description: 'The user you want to remove the timeout from',
                required: true,
            },
            {
                name: 'reason',
                type: 3,
                description: 'The reason for removing the timeout',
                required: false,
            }
        ]
    });

    client.application.commands.create({
        name:'create-room',
        description: 'Creates a voice channel for a game',
        options: [
            {
                name: 'name',
                type: 3,
                description: 'The name of the room',
                required: true,
            },
            {
                name: 'max-players',
                type: 4,
                description: 'The maximum number of players',
                required: true,
            },
            {
                name: 'game',
                type: 3,
                description: 'The game you want to play',
                required: true,
            },
            {
                name: 'number-of-players',
                type: 4,
                description: 'The number of players in the room',
                required: true,
            }
        ]
    });
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'ping':
            await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
            break;

        case 'help':
            await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
            break;

        case 'get-id':
            await interaction.reply({ content: 'ID Retrieved.' });
            break;

        case 'create-room':
            console.log('Create Room command detected');
            await createRoom(interaction);
            // await createVCInvite(interaction, channel);
            break;

        case 'faq':
            console.log('FAQ command detected');
            console.log(interaction);
            await sendFaq(interaction);
            break;

        case 'ask':
            console.log('Ask command detected');
            await sendAnswer(interaction);
            break;
            
        case 'talk':
            break;
        
        case 'rules':
            console.log('Rules command detected');
            await sendRules(interaction);
            break;

        case 'ban':

        case 'kick':

        case 'timeout':

        case 'remove-timeout':        

        default:
            interaction.reply({ content: 'Unknown command' });
            console.log('Unknown command');
            break;
    }
    console.log(interaction);
});

client.login(token);