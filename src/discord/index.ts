import config from "../../config.json";
import {Channel, Client, Message, TextChannel} from "discord.js";
import EventEmitter from "events";
import {Telegram} from "telegraf";
import path from 'path';
import {MysqlKlaruConnection} from "klaru-mysql-wrapper/dist";
import {IParsedMessage} from "../telegram/functions/telegramMessageParser";
import BotUser, {IMapUserProps} from "../classes/BotUser";
import {discordBot, eventHandler, mySQLConnection} from "../bot";
const request = require('request');


export default function runDiscordBot(): void{
    const telegram = new Telegram(config.TelegramToken);
    discordBot.on("messageCreate", (message: Message)=>{
        if(message.author.bot) return;
        if(!message.channel.isDMBased()) return;
        const cId = message.channelId;
        let redirect_message = message.content + '\n';
        message.attachments.map(item => redirect_message += item.url + '\n');
        eventHandler.emit('discordMsg', redirect_message);
    });
    discordBot.on("ready", ()=>{
        console.log("Bot has started");
    });
    eventHandler.on('stickerSend', async (imgPath: string)=>{
        discordBot.users.fetch("390561515054563328").then(async user=>{
            const dm = user?.dmChannel ?? await user.createDM();
            const imagesPath = path.join(__dirname, `../${imgPath}`);
            dm.send({files: [imagesPath]});
        }

        )

    });
    eventHandler.on("telegramMessage", async (msg: IParsedMessage)=>{
        try{
            discordBot.users.fetch("390561515054563328").then(async user=>{
                const dm = user?.dmChannel ?? await user.createDM();
                let imagesPath:any = [];
                if(msg?.files!==undefined){
                    msg.files.map((item: string)=>{
                        imagesPath.push( path.join(__dirname, `../${item}`));
                    });
                }else{
                    imagesPath = undefined;
                }
                dm.send({content: msg.text, files: imagesPath ?? null});
            });
        }catch (err){
            console.log(err);
        }



    });
    discordBot.login(config.DiscordToken);
}

