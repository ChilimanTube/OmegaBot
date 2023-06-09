const path = require('path');
const fs = require('node:fs');
const { Client, GatewayIntentBits, Partials, Events, SlashCommandBuilder, Collection, VoiceChannel } = require('discord.js');
const {token, clientId, clientKey, prefix} = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { helpEmbed } = require('./Commands/general/help.js');
const createRoom = require('./commands/lfg/create-room');
const fetch = require('fetch-ponyfill')().fetch;
const { Transform } = require('stream');
const { log } = require('node:console');
const toBuffer = require('typedarray-to-buffer');
const { generateDependencyReport } = require('@discordjs/voice');
const { sendChat, systemSendChat, sendFaq } = require('./CommandDetection/detection.js');


/*
TODO_LIST:
- Add a command to create a room
- Add a command to invite the user to the created room
- Natural Language FAQ
- Natural Language rules
- Code cleanup
- Host the bot on a server along with the website
- Maybe make the YouTube API work + Twitter API
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
    client.user.setPresence({ activities: [{ name: activityName[Math.floor(Math.random() * activityName.length)] }], status: 'online' , type: "WATCHING"});

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
        name:'activate',
        description: 'Activates the command detection feature - DEVELOPMENT ONLY',
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
    });

    client.application.commands.create({
        name:'search',
        description: 'Answers your question',
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
        const { name, maxPlayers, game, numberOfPlayers } = interaction.options;
        createRoom(interaction, name, maxPlayers, game, numberOfPlayers);
        console.log(name, maxPlayers, game, numberOfPlayers);
        console.log('Room Created');
        await interaction.reply({
          content: `Room Created: ${name} ${maxPlayers} ${game} ${numberOfPlayers}`,
        });
        break;

    case 'activate':
        await interaction.reply('Activated!');
        userNextMessage.set(interaction.user.id, (message) => {
            console.log(`Received message from ${message.author.username}: ${message.content}`);
            systemSendChat(message);
        });
        break;

    case 'faq':
        console.log('FAQ command detected');
        console.log(interaction);
        await sendFaq(interaction);
        break;

    case 'rules':
        break;

    case 'search':
        break;
        
    case 'talk':
        break;
        
      default:
        interaction.reply({ content: 'Unknown command' });
        console.log('Unknown command');
        break;
    }
    console.log(interaction);
});

// client.on('interactionCreate', async (interaction) => {
//     if (!interaction.isCommand()) return;
  
//     if (interaction.commandName === 'activate') {
//         await interaction.reply('Activated!');

//         userNextMessage.set(interaction.user.id, (message) => {
//             console.log(`Received message from ${message.author.username}: ${message.content}`);
//             systemSendChat(message);
//         })

//     }
// });

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (userNextMessage.has(message.author.id)) {
        // Call the callback function and remove it
        userNextMessage.get(message.author.id)(message);
        userNextMessage.delete(message.author.id);
    }
    console.log("Message recieved: '" + message.content + "' from " + message.author.username);
});

client.login(token);