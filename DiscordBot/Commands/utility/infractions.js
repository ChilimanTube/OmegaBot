const {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder,} = require('discord.js');

/**
 * This function bans a user from a server if the person executing the function has the necessary role.
 * @param interaction - This parameter is likely an object representing the interaction that triggered
 * the function. It may contain information such as the user who triggered the interaction, the channel
 * it occurred in, and any options or arguments provided.
 * @param user - The user to be banned from the server.
 * @param reason - The reason for banning the user. It is an optional parameter that can be passed to
 * provide context for the ban.
 */
function ban(interaction, user, reason){
    if (interaction.member.roles.cache.has('882933659363043368')) {
        interaction.guild.members.ban(user, {reason: reason});
        interaction.reply({content: `Banned ${user} for ${reason}`, ephemeral: true});
    } else {
        interaction.reply({content: `You don't have permissions to do that`, ephemeral: true});
    }
}


/**
 * The function kicks a user from a guild if the member executing the command has the necessary role.
 * @param interaction - The interaction parameter is an object that represents the interaction between
 * the user and the bot. It contains information such as the user who triggered the interaction, the
 * command that was used, and any options or arguments that were provided.
 */
function kick(interaction){
    if (interaction.member.roles.cache.has('882933659363043368')) {
        interaction.guild.members.kick(user, {reason: reason});
        interaction.reply({content: `Kicked ${user} for ${reason}`, ephemeral: true});
    } else {
        interaction.reply({content: `You don't have permissions to do that`, ephemeral: true});
    }
}

/**
 * This is a JavaScript function that implements a timeout command with confirmation buttons and
 * permission checks.
 * @param interaction - The interaction object represents the interaction between the user and the bot,
 * and contains information such as the user who triggered the interaction, the channel where the
 * interaction occurred, and the options selected by the user.
 * @returns nothing (undefined). It either sends a reply with an error message if the bot doesn't have
 * permissions to send messages in the channel, or it waits for the user to confirm or cancel the
 * timeout action through a message component collector. Depending on the user's choice, it either
 * times out the target user and sends an embed with the details, or cancels the action and sends a
 */
async function timeout(interaction){
    if (!interaction.channel.permissionsFor(interaction.client.user).has('SendMessages')) {
        interaction.reply({content: `I don't have permissions to send messages in this channel`, ephemeral: true});
        return;
    }

    // IMPORTANT - Implement a check to see if the user has the necessary permissions to timeout a user

    const target = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration') * 60000;
    const reason = interaction.options.getString('reason');

    const confirm = new ButtonBuilder()
        .setLabel(`CONFIRM`)
        .setCustomId('confirm')
		.setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
        .setLabel('CANCEL')
        .setCustomId('cancel')
		.setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
        .addComponents(confirm, cancel);

    const timeoutEmbed = new EmbedBuilder()
        .setTitle(`${target.username} has been timed out!`)
        .setColor('#ff0000')
        .setThumbnail(target.displayAvatarURL())
        .setDescription(`**Reason:** ${interaction.options.getString('reason')}`)
        .addFields(
            { name: 'Duration', value: `${(duration / 60000)} minutes`, inline: true },
        )
        .setFooter({ text: `Timed out by ${interaction.user.username}`})
        .setTimestamp();

    const confirmationEmbed = new EmbedBuilder()
        .setTitle(`Are you sure you want to **time out** ${target.username} for ${interaction.options.getString('reason')} for the duration of ${duration/60000} minutes?`)
        .setColor('#ff0000');

    const response = await interaction.reply({
        embeds: [confirmationEmbed],
        components: [row],
    });

    const collectorFilter = i => i.user.id === interaction.user.id;
    try {
	    const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

        if (confirmation.customId === 'confirm') {
            const member = interaction.guild.members.cache.get(target.id);
            await member.timeout(duration, reason);
            await confirmation.update({ embeds: [timeoutEmbed], components: [] });
        } else if (confirmation.customId === 'cancel') {
            await confirmation.update({ content: 'Action cancelled.', components: [] });
        }
    } catch (e) {
        await interaction.editReply({ content: 'Confirmation not received within 1 minute, action cancelled.', components: [] });
        console.log(e);
    }
}

/**
 * This is a JavaScript function that removes a timeout from a user with confirmation and cancellation
 * options.
 * @param interaction - The interaction object represents the interaction between the user and the bot,
 * and contains information such as the user who triggered the interaction, the channel where the
 * interaction occurred, and the options selected by the user.
 * @returns The function is not returning anything, but it may return early with `return;` if the bot
 * does not have permissions to send messages in the channel.
 */
async function removeTimeout(interaction){
    if (!interaction.channel.permissionsFor(interaction.client.user).has('SendMessages')) {
        interaction.reply({content: `I don't have permissions to send messages in this channel`, ephemeral: true});
        return;
    }

    // IMPORTANT - Implement a check to see if the user has the necessary permissions to remove timeout from a user

    const target = interaction.options.getUser('user');
    const duration = null;
    const reason = interaction.options.getString('reason');

    const confirm = new ButtonBuilder()
        .setLabel(`CONFIRM`)
        .setCustomId('confirm')
		.setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
        .setLabel('CANCEL')
        .setCustomId('cancel')
		.setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
        .addComponents(confirm, cancel);

    const removeTimeoutEmbed = new EmbedBuilder()
        .setTitle(`${target.username}'s timeout has been removed.`)
        .setColor('#ff0000')
        .setDescription(`**Reason:** ${reason}`)
        .setThumbnail(target.displayAvatarURL())       
        .setFooter({ text: `Timeout removed by ${interaction.user.username}`})
        .setTimestamp();

    const confirmationEmbed = new EmbedBuilder()
        .setTitle(`Are you sure you want to **remove timeout** ${target.username} for ${interaction.options.getString('reason')} for the duration of ${duration/60000} minutes?`)
        .setColor('#ff0000');

    const response = await interaction.reply({
        embeds: [confirmationEmbed],
        components: [row],
    });

    const collectorFilter = i => i.user.id === interaction.user.id;
    try {
	    const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

        if (confirmation.customId === 'confirm') {
            const member = interaction.guild.members.cache.get(target.id);
            await member.timeout(duration, reason);
            await confirmation.update({ embeds: [removeTimeoutEmbed], components: [] });
        } else if (confirmation.customId === 'cancel') {
            await confirmation.update({ content: 'Action cancelled.', components: [] });
        }
    } catch (e) {
        await interaction.editReply({ content: 'Confirmation not received within 1 minute, action cancelled.', components: [] });
        console.log(e);
    }
}

/**
 * This is a JavaScript function that prompts a user to confirm a warning action on a specified user
 * with a reason, and updates the message with a confirmation or cancellation message based on the
 * user's response.
 * @param interaction - The interaction object represents the interaction between the user and the bot.
 * It contains information about the user, the channel, and the command that was invoked.
 * @returns nothing (undefined) if the bot does not have permissions to send messages in the channel.
 * If the bot has the necessary permissions, the function will wait for a confirmation from the user
 * and update the interaction message accordingly.
 */
async function warn(interaction){
    if (!interaction.channel.permissionsFor(interaction.client.user).has('SendMessages')) {
        interaction.reply({content: `I don't have permissions to send messages in this channel`, ephemeral: true});
        return;
    }

    // IMPORTANT - Implement a check to see if the user has the necessary permissions to warn a user

    const target = interaction.options.getUser('user');

    const confirm = new ButtonBuilder()
        .setLabel(`CONFIRM`)
        .setCustomId('confirm')
		.setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
        .setLabel('CANCEL')
        .setCustomId('cancel')
		.setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
        .addComponents(confirm, cancel);

    const warnEmbed = new EmbedBuilder()
        .setTitle(`${target.username} has been warned!`)
        .setColor('#ff0000')
        .setThumbnail(target.displayAvatarURL())
        .setDescription(`**Reason:** ${interaction.options.getString('reason')}`)
        .setFooter({ text: `Warned by ${interaction.user.username}`})
        .setTimestamp();

    const confirmationEmbed = new EmbedBuilder()
        .setTitle(`Are you sure you want to **warn** ${target.username} for ${interaction.options.getString('reason')}?`)
        .setColor('#ff0000');

    const response = await interaction.reply({
        embeds: [confirmationEmbed],
        // content: `Are you sure you want to **warn** ${target.username} for ${interaction.options.getString('reason')}?`,
        components: [row],
    });

    const collectorFilter = i => i.user.id === interaction.user.id;
    try {
	    const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

        if (confirmation.customId === 'confirm') {
            await confirmation.update({ embeds: [warnEmbed], components: [] });
        } else if (confirmation.customId === 'cancel') {
            await confirmation.update({ content: 'Action cancelled.', components: [] });
        }
    } catch (e) {
        await interaction.editReply({ content: 'Confirmation not received within 1 minute, action cancelled.', components: [] });
    }
}

module.exports = { ban, kick, timeout, removeTimeout, warn};