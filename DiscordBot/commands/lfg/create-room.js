const { Client, GatewayIntentBits, Partials, Events, SlashCommandBuilder     } = require('discord.js');

module.exports = (client) => {
    client.application.commands.create({
      name: 'create-room',
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
          type: '4',
          required: true,
        },
      ],
    });
  };