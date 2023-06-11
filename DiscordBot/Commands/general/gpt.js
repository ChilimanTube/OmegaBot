const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");

const openai = startChat();

/**
 * The function initializes and returns an instance of the OpenAI API with a given organization and API
 * key.
 * @returns The function `startChat()` is returning an instance of the `OpenAIApi` class, which is
 * created using the `Configuration` class and an API key.
 */
function startChat() {
    config();
    const configuration = new Configuration({
        organization: "org-jbSx2APVzulGJyLv0Jn5aJTD",
        apiKey: process.env.OPENAI_API_KEY,
    });
    return new OpenAIApi(configuration);
}

/**
 * The function sends a chat interaction to OpenAI's GPT-3 model and returns a response to the user.
 * @param interaction - The interaction object represents a user's interaction with a Discord bot. It
 * contains information about the user, the command they used, and any options or arguments they
 * provided.
 */
async function sendInteractionChat(interaction) {
    const question = interaction.options.get('question').value;

    await interaction.deferReply();

    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord server called Blindcraft. The server is an official discord server of LogicProXGaming, aka Logic, who's a blind Minecraft player." },
            { "role": "user", "content": question.content }
        ],
        temperature: 0.6
    }).then((data) => {
        console.log(data.data);
        interaction.editReply(data.data.choices[0].message)
    }
    ).catch((error) => {
        console.error(error);
    });
}

    const faq = `What's Logic's real name? - Chris; 
    What's Logic's guide dog's name? - Krieger, and he is a 6-year-old lab at the time of this posting; 
    Is Logic really blind? - Yes, he is, though he has some sight as you will see in his streams; 
    What visual changes does Logic use? - He uses a texture pack called Easy Blocks that helps remove detail and assist with block separations. He also uses a custom texture pack made by Boom Pixals of our own community that helps with contrast in specific situations; 
    What mods does Logic use? - He uses the Fabric loader along with MAmbiahnce and Accessibility Plus; 
    What is the name of the shaders you use the most? - Nostalgia shaders. Other shaders change too much, and he can't handle a lot of visual input; 
    Are there any other blind players? - Yes, there are. We have been building our roster for 3 years, and we've got around 20 blind players, with a few sighted players helping with visual things and admin duties; 
    Can I be mod? - No, you can't. Generally, if you are asking, you are not at a point that we can be having that talk. Mods have to be proven members of our community who can be trusted to handle things when Logic isn't around; 
    Can I join the server? - The server will be public soon; 
    How old is the server? - This map started 3 years ago as Logic's first survival map. It was uploaded to Realms 2 months later after his other blind friends and some subscribers wanted to play, and it was transferred to its current home in January 2021; 
    What about the flying players? - Blindcraft is a survival SMP. If you see a staff member flying, don't always assume they are in creative as we have access to /fly. If you see a non-staff member non-elytra flying, please message a staff member with that person's username and the day and estimated time of day so it can be handled;`;

/**
 * The function sends a response to a user's question using an AI model and a pre-defined FAQ.
 * @param interaction - The interaction object represents the interaction between the user and the bot,
 * and contains information about the user's input and the context of the interaction.
 */
async function sendFaq(interaction) {
    const question = interaction.options.get('question').value;
    
    await interaction.deferReply();

    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord server called Blindcraft."
            + "Respond to the user's question using the following FAQ. If the question is not in the FAQ, try to answer it on your own or say you don't have an answer for that.  " + faq},
            { "role": "user", "content": question }
        ],
        temperature: 0.6
    }).then((data) => {
        console.log(data.data);
        interaction.editReply(data.data.choices[0].message)
    }
    ).catch((error) => {
        console.error(error);
    });
}

/**
 * This function sends a response to a user's question using OpenAI's GPT-3 language model.
 * @param interaction - The interaction object represents the interaction between the user and the bot
 * in Discord. It contains information about the user, the channel, and the command that was invoked.
 */
async function sendAnswer(interaction) {
    const question = interaction.options.get('question').value;
    
    await interaction.deferReply();

    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord server called Blindcraft. The server is an official discord server of LogicProXGaming, aka Logic, who's a blind Minecraft player."},
            { "role": "user", "content": question }
        ],
        temperature: 0.8
    }).then((data) => {
        console.log(data.data);
        interaction.editReply(data.data.choices[0].message)
    }
    ).catch((error) => {
        console.error(error);
    });
}

const rules = `Rule 1 - No hate speech or trolling 
Rule 2 - No NSFW or suggestive content 
Rule 3 - No advertising or sales 
Rule 4 - No spamming, mass emoji or soundboard spam 
Rule 5 - Pay attention to the channels and their purpose 
Rule 6 - No names of special characters or impersonations 
Rule 7 - No condemnation of players of different platforms 
Rule 8 - No user bots or alternate accounts 
Rule 9 - Stay human and considerate of other users 
Rule 10 - Follow all personnel instructions immediately 
Punishments apply dependently on SMP and Discord server. If you will get banned / kicked from DC, so you will be from SMP. (In the opposite case, severity of the rule breaking action is taken under consideration).
Rules apply to your nickname, username, status and activity.`

/**
 * This is a JavaScript function that uses OpenAI's GPT-3 language model to respond to a user's
 * question based on a set of rules for a Discord server called Blindcraft.
 * @param interaction - The interaction object represents the interaction between the user and the
 * Discord bot. It contains information about the user, the command they used, and any options or
 * arguments they provided.
 */
async function sendRules(interaction) {
    const question = interaction.options.get('question').value;
    
    await interaction.deferReply();

    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Your name is Omega. You are working on Discord server called Blindcraft."
            + "Respond to the user's question using the following set of rules for the Blindcraft. If the question is not in the rules, try to answer it on your own or say you don't have an answer for that.  " + rules},
            { "role": "user", "content": question }
        ],
        temperature: 0.6
    }).then((data) => {
        console.log(data.data);
        interaction.editReply(data.data.choices[0].message)
    }
    ).catch((error) => {
        console.error(error);
    });
}

module.exports = { sendInteractionChat, sendFaq, sendRules, sendAnswer };