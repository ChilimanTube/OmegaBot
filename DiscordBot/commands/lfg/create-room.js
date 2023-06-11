const Discord = require('discord.js');
const { Permissions, Partials, Events, EmbedBuilder, MessageActionRow, MessageButton, ButtonBuilder, ActionRowBuilder } = require('discord.js');

/**
 * This function creates a new voice channel in a Discord server with specific permissions and user
 * limits, and generates an invite for the channel.
 * @param interaction - The interaction object represents the interaction between the user and the bot.
 * It contains information about the user, the command they used, and any options or arguments they
 * provided.
 */
async function createRoom(interaction){

    await interaction.deferReply();

    const channelName = await interaction.options.getString('name');
    console.log('!!!!!! CHANNEL NAME: ' + channelName);
    const channel = await interaction.guild.channels.create({
      name: channelName,  
      type: Discord.ChannelType.GuildVoice,
        parent: '769970767839756308',
        permissionOverwrites: [
            {
                id: interaction.guild.roles.everyone,
                deny: ['ViewChannel'],
            },
            {
                id: interaction.user.id,
                allow: ['ViewChannel'],
            },
        ],
        userLimit: interaction.options.getInteger('max-players'),
    });

    createVCInvite(interaction, channel);
}

/**
 * This function deletes a specified channel in a Discord server.
 * @param interaction - The interaction parameter is an object that represents the interaction between
 * the user and the bot. It contains information such as the user who initiated the interaction, the
 * command that was used, and any options or arguments that were provided.
 */
async function deleteRoom(interaction){
    await interaction.deferReply();
    const channelName = interaction.options.getString('name');
    const channel = interaction.guild.channels.cache.find(channel => channel.name === channelName);
    channel.delete();
    interaction.editReply({
        content: `Deleted the channel ${channelName}`,
        ephemeral: true,
    });
}

/**
 * This function creates a voice channel invite with a specified number of maximum users and generates
 * a button to join the channel.
 * @param interaction - The interaction object represents the interaction between the user and the bot.
 * It contains information about the user, the command they used, and any options or arguments they
 * provided.
 * @param voiceChannel - The voice channel where the invite will be created.
 */
async function createVCInvite(interaction, voiceChannel){
  var numberOfUsers = (interaction.options.getInteger('max-players') - interaction.options.getInteger('number-of-players'));
  const embed = new Discord.EmbedBuilder()
    .setTitle(`${interaction.user.username} invites you to join them in ${interaction.options.getString('game')}`)
    .setDescription(`Looking for ${numberOfUsers} more players`)
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp();

  const invite = await interaction.guild.invites.create(voiceChannel.id, {
    maxAge: 0,
    maxUses: numberOfUsers,
    unique: true
   }).catch(console.error);

  const btn = new ButtonBuilder()
      .setLabel('Join')
      .setStyle('Link')
      .setURL(`https://discord.gg/${invite.code}`);

  const row = new ActionRowBuilder()
    .addComponents(btn);

  await interaction.editReply({ embeds: [embed], components: [row] });
}

module.exports = {createRoom, deleteRoom, createVCInvite};