const path = require('node:path');
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "omega-keyfile.json");

const fs = require('node:fs');
const { Client, GatewayIntentBits, Partials, Events, SlashCommandBuilder, Collection, VoiceChannel } = require('discord.js');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const {token, clientId, clientKey, prefix} = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { helpEmbed } = require('./Commands/general/help.js');
const createRoom = require('./commands/lfg/create-room');
const fetch = require('fetch-ponyfill')().fetch;
const speech = require('@google-cloud/speech');
const { Transform } = require('stream');
const { log } = require('node:console');





const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    ], partials: [Partials.Channel]
});

const HOUNDIFY_CLIENT_ID = clientId;
const HOUNDIFY_CLIENT_KEY = clientKey;

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
new SlashCommandBuilder()
    .setName('activate')
    .setDescription('Activates the Speech to Text feature');
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


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === 'activate') {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({
                content: "You need to be in a voice channel to use this command.",
                ephemeral: true,
            });
        }
  
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        console.log(connection.state); // Should log 'signalling' or 'ready'

        const client = new speech.SpeechClient();

        const request = {
            config: {
                encoding: 'LINEAR16',
                sampleRateHertz: 48000,
                languageCode: 'en-US',
            },
            interimResults: false,
        };

        const recognizeStream = client
            .streamingRecognize(request)
            .on('error', error => {
                console.error(`Recognize stream error: ${error}`);
            })
            .on('data', data => {
                console.log(`Recognize stream data: ${data}`);
                const transcription = data.results[0].alternatives[0].transcript;
                console.log(`Transcription: ${transcription}`);
                interaction.channel.send(`Transcription: ${transcription}`); // delete this later, just for testing
                if (transcription.toLowerCase() === 'ping') {
                    interaction.channel.send('Pong!');
                }
            })
            .on('end', () => {
                console.log('Recognize stream ended');
            });

        const convertToMono = new Transform({            
            transform: (chunk, encoding, callback) => {
                let monoChunk = new Int16Array(chunk.length / 4);
                for (let i = 0; i < monoChunk.length; i++) {
                    monoChunk[i] = chunk.readInt16LE(i * 4);
                }
                callback(null, Buffer.from(monoChunk.buffer));
            },
        });

        

        const receiver = connection.receiver;
  
        connection.on('speaking', async (user, speaking) => {
            console.log(`Speaking state change. User: ${user.username}, Speaking: ${speaking}`); //Testing purposes
            if (speaking.bitfield) {
                const audioStream = connection.receiver.subscribe(user).pipeline;
                audioStream.on('data', (chunk) => {                             // testing purposes, delete later?
                    console.log(`Received ${chunk.length} bytes of data.`);
                });
                audioStream.pipe(convertToMono).pipe(recognizeStream);
                console.log(`Sample rate: ${connection.receiver.ssrcToSpeakingData.get(user.id).sampleRate}`); // testing purposes

            }
        });
        return interaction.reply({
            content: 'Speech to Text activated. Start speaking to see the results.',
            ephemeral: true,
        });
    }
});


client.login(token);