const {Client, Intents} = require('discord.js');
require('dotenv').config();
const csv  = require('./tools');

const PREFIX = "!";
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: ['MESSAGE', 'CHANNEL']
});

//  LOGIN TO DISCORD
client.login(process.env.DISCORD_KEY);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.content.trim().toLowerCase() === `!${command} ${args}`) {
        let members = message.member.roles.cache.find(role => {
            if(role.name === args[0]) {
                return role;
            }
        })
        let list_members = members.members.map(user => {
            let {id, displayName, joinedAt  } = user;
            let user_json = {
                user_id: id,
                username: displayName,
                joined_at: joinedAt
            }
            return user_json
        });
        console.log(list_members);
        
        csv.CreateCsv(list_members);
        
        message.channel.send(`CSV CREATED FOR MEMBERS WITH THE ${args[0]} ROLE`);
    }
});


