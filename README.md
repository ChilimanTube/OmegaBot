# How to use Discord bot locally

Invite the bot to your Discord server, where you want to test it. You can do so by going on the website, which you can host locally, or just by clicking on the link below.

[Use this link to invite the bot to your Discord server](https://discord.com/api/oauth2/authorize?client_id=1101441641593700432&permissions=8&scope=bot)

When you have the bot on your server, you need to install all the dependencies, which the bot uses.
Firstly, go to /DiscordBot folder and run the following code:

```bash 
# This will install all packages that are needed
npm i

# After that, you can host the bot locally using:
node .
```

## The `node .` command runs the bot. You should see the following message in your console:

Logged in as OmegaBot#0838!