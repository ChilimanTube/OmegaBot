const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { MessageEmbed } = require('discord.js');

const author = {
    name: 'The Blindcraft Server',
    icon_url: 'https://cdn.discordapp.com/attachments/982585395839660042/1116372348963139634/Omega_Logo_500_250_px_Prezentace_16_9.png',
    // url: 'https://vkral.xyz' - still in development
}

const helpEmbed = new Discord.EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('__**Help Guide**__')
    //.setURL('https://kousek-stranky.cwute.systems')
    .setDescription('*Utility bot for The Blindcraft Discord server*')
    .setThumbnail('https://cdn.discordapp.com/attachments/982585395839660042/1116372348963139634/Omega_Logo_500_250_px_Prezentace_16_9.png')
    .addFields(
        { name: '**Interactions**', value: '## Interactions \n## Commands with ! prefix'},
        { name: '**Commands**', value: '## Commands \n## Commands with ! prefix'},
        { name: '\u200B', value: '\u200B' , inline: true},
    )
    //.setImage('https://cdn.discordapp.com/attachments/1047406730331553842/1047410032154779698/38F7A04B-50DC-48CB-8386-60B497E1298A.jpg')
	.setAuthor(author)
    .setTimestamp()
    .setFooter({text: 'OmegaBot by Chili'});

    module.exports = {
        helpEmbed,
    };