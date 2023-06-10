function ban(interaction, user, reason){
    if (interaction.member.roles.cache.has('882933659363043368')) {
        interaction.guild.members.ban(user, {reason: reason});
        interaction.reply({content: `Banned ${user} for ${reason}`, ephemeral: true});
    } else {
        interaction.reply({content: `You don't have permissions to do that`, ephemeral: true});
    }
}

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