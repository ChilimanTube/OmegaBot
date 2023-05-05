const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Events, SlashCommandBuilder, Collection } = require('discord.js');
const {token} = require('./config.json');

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

const lfg = new SlashCommandBuilder()
    .setName('create-room')
    .setDescription('Creates a LFG room')
    
    .addStringOption(option =>
         option.setName('name')
         .setDescription('The name of the room')
         .setRequired(true))
    
    .addNumberOption(option2 =>
        option2.setName('max-players')
        .setDescription('The maximum number of players in the voice channel')
        .setRequired(false))

    .addStringOption(option3 =>
        option3.setName('game')
        .setDescription('The game you are playing')
        .setRequired(true))
    
    .addNumberOption(option4 =>
        option4.setName('number-of-players')
        .setDescription('The number of players you are looking for')
        .setRequired(true));



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const activityName = ["/help"];
    client.user.setPresence({ activities: [{ name: activityName[Math.floor(Math.random() * activityName.length)] }], status: 'online' , type: "WATCHING"});

    client.application.commands.create({
        name: 'ping',
        description: 'Replies with pong!'
    })
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
    
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});



client.login(token);