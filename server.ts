import express, { Request, Response } from 'express';
import Client from './src/discord'
require('dotenv').config()
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/bot_discord", (req: Request, res: Response) => {
    res.send("Bot is running!")
})

app.post(`/send_message`, async (req: Request, res: Response) => {
    const { message, key, id_channel } = req.body;
    console.log(`message`, message);
    if (key !== process.env.CHAVE_SEGURANCA) {
        res.json({
            key: `Falta de segurança!`
        })
        return
    }
    if (!message) {
        res.json({
            key: `Falta de mensagem!`
        })
        return
    }
    const default_channel = id_channel || `953476391117160498`

    //@ts-ignore
    const response = await Client.channels.cache.get(default_channel).send(message)

    res.json({ response })
})

function keepAlive() {
    app.listen(port, () => {
        console.log("app is ready.", `port`, port);
        Client.login(process.env.BOT_TOKEN)
    })
}

keepAlive()