const Discord = require('discord.js');
const { Permissions, Partials, Events, EmbedBuilder, MessageActionRow, MessageButton, ButtonBuilder, ActionRowBuilder } = require('discord.js');

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