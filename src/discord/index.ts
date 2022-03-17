import Discord, { Intents, Message } from 'discord.js'
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    //@ts-ignore
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg: Message) => {
    if (msg.author.bot) return

    if (msg.content === "ping") {
        msg.reply("pong");
    }
})


export default client