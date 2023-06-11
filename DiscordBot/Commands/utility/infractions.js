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
 * This function kicks a user from a server if the person executing the command has the necessary role.
 * @param interaction - This parameter is likely an object representing the interaction that triggered
 * the function. It may contain information such as the user who triggered the interaction, the channel
 * it occurred in, and any options or arguments provided by the user.
 * @param user - The user that is being kicked from the server.
 * @param reason - The reason parameter is a string that specifies the reason for kicking the user. It
 * is used to provide context for the action and can be helpful for moderation purposes.
 */
function kick(interaction, user, reason){
    if (interaction.member.roles.cache.has('882933659363043368')) {
        interaction.guild.members.kick(user, {reason: reason});
        interaction.reply({content: `Kicked ${user} for ${reason}`, ephemeral: true});
    } else {
        interaction.reply({content: `You don't have permissions to do that`, ephemeral: true});
    }
}

function timeout(interaction, user, duration, reason){

}

function removeTimeout(interaction, user, reason){

}

function warn(interaction, user, reason){
    
}