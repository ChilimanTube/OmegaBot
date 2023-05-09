const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Events, SlashCommandBuilder, Collection     } = require('discord.js');
const {token} = require('./config.json');
const { REST } = require('@discordjs/rest');
const { helpEmbed } = require('./Commands/general/help.js');
const createRoom = require('./commands/lfg/create-room');

const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
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


new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!');

new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invites a user to a voice channel');

new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows a list of commands');

// const lfg = new SlashCommandBuilder()
//     .setName('create-room')
//     .setDescription('Creates a LFG room')
    
//     .addStringOption(option =>
//          option.setName('name')
//          .setDescription('The name of the room')
//          .setRequired(true))
    
//     .addNumberOption(option2 =>
//         option2.setName('max-players')
//         .setDescription('The maximum number of players in the voice channel')
//         .setRequired(false))

//     .addStringOption(option3 =>
//         option3.setName('game')
//         .setDescription('The game you are playing')
//         .setRequired(true))
    
//     .addNumberOption(option4 =>
//         option4.setName('number-of-players')
//         .setDescription('The number of players you are looking for')
//         .setRequired(true));



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
        name:'create-room',
        description: 'Creates a LFG room',
        options: [
            {
                name: 'name',
                description: 'The name of the room',
                type: 'STRING',
                required: true,
            },
            {
                name: 'max-players',
                description: 'The maximum number of players in the voice channel',
                type: 'NUMBER',
                required: false,
            },
            {
                name: 'game',
                description: 'The game you are playing',
                type: 'STRING',
                required: true,
            },
            {
                name: 'number-of-players',
                description: 'The number of players you are looking for',
                type: 'NUMBER',
                required: true,
            },
        ],
    });
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

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



client.login(token);