const path = require('path');
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "omega-keyfile.json");

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
const { sendChat } = require('./CommandDetection/detection.js');




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

// const pingCommand = new SlashCommandBuilder()
//     .setName('ping')
//     .setDescription('Replies with pong!');
// client.application.commands.create(pingCommand);

new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invites a user to a voice channel');

new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows a list of commands');
new SlashCommandBuilder()
    .setName('activate')
    .setDescription('Activates the Speech to Text feature');

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
        description: 'Retrieves YouTube Channel ID',
    });

    client.application.commands.create({
        name:'activate',
        description: 'Activates the Speech to Text feature',
    });
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
    }

    if (interaction.commandName === 'help') {
        await interaction.reply({ embeds: [helpEmbed] }); 
    }

    if (interaction.commandName === 'get-id') {
        await interaction.reply({ content: 'ID Retrieved.' });
    }

    if (interaction.commandName === 'create-room') {
        const { name, maxPlayers, game, numberOfPlayers } = interaction.options;
        createRoom(interaction, name, maxPlayers, game, numberOfPlayers);
        console.log(name, maxPlayers, game, numberOfPlayers);
        console.log('Room Created');
        await interaction.reply({
          content: `Room Created: ${name} ${maxPlayers} ${game} ${numberOfPlayers}`,
        });
      }
    console.log(interaction);
});


const userNextMessage = new Map();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === 'activate') {
        await interaction.reply('Activated!');

        userNextMessage.set(interaction.user.id, (message) => {
            console.log(`Received message from ${message.author.username}: ${message.content}`);
            sendChat(message);
        })

    }
});

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