const path = require('path');
const fs = require('node:fs');
const { Client, GatewayIntentBits, Partials, Events, SlashCommandBuilder, Collection, VoiceChannel } = require('discord.js');
const {token, clientId, clientKey, prefix} = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { helpEmbed } = require('./commands/general/help.js');
const { createRoom } = require('./commands/lfg/create-room');
const fetch = require('fetch-ponyfill')().fetch;
const { Transform } = require('stream');
const { log } = require('node:console');
const toBuffer = require('typedarray-to-buffer');
const { generateDependencyReport } = require('@discordjs/voice');
const { sendInteractionChat, sendFaq, sendRules, sendAnswer, createVCInvite } = require('./commands/general/gpt.js');
const { checkForNewVideo } = require('./commands/api/youtube.js');

/* This code is creating a new instance of the Discord.js `Client` class with specific intents and
partials. Intents are used to specify which events the bot will receive from Discord, and partials
are used to enable caching of certain types of data. */
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    ], partials: [Partials.Channel]
});

/* This code is setting up the bot's commands by creating a new `Collection` object to store them,
reading the command files from the `commands` directory, and adding each command to the `Collection`
object with its name as the key. It also checks that each command file has the required `data` and
`execute` properties and logs a warning if they are missing. This allows the bot to easily access
and execute the appropriate command when a user inputs a command. */
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

/* The above code is setting up various Discord bot commands using the Discord.js library. It creates
commands for general use, such as "ping" and "help", as well as utility commands like "ban" and
"kick". It also sets up a presence for the bot and schedules a function to check for new videos on a
YouTube channel. */
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

    checkForNewVideo();
    setInterval(checkForNewVideo, 300000);

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
        name:'check-for-new-videos',
        description: 'Checks for new videos on the YouTube channel - DEVELOPMENT ONLY',
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
                description: 'The number of players already in the group',
                required: true,
            }
        ]
    });
});

/* The above code is an event listener for Discord interactions. It checks if the interaction is a
command and then performs different actions based on the command name. The actions include replying
with a message, creating a voice channel, sending a FAQ or rules message, checking for new videos,
and more. Some of the commands are not yet implemented and will reply with a message indicating
that. The code also logs some information to the console for debugging purposes. */
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

        case 'check-for-new-videos':
            console.log('Check for new videos command detected');
            await checkForNewVideo();
            break;

        case 'ban':
            await interaction.reply({ content: 'Command not yet implemented' });
            break;
        case 'kick':
            await interaction.reply({ content: 'Command not yet implemented' });
            break;
        case 'timeout':
            await interaction.reply({ content: 'Command not yet implemented' });
            break;
        case 'remove-timeout':        
            await interaction.reply({ content: 'Command not yet implemented' });
            break;
        default:
            interaction.reply({ content: 'Unknown command' });
            console.log('Unknown command');
            break;
    }
    console.log(interaction);
});

/* `client.login(token);` is logging the bot into Discord using the provided token. This allows the bot
to connect to the Discord API and start receiving events and interactions. */
client.login(token);