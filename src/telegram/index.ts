import config from "../../config.json";
import {Telegraf, Telegram} from "telegraf";
import EventEmitter from "events";
import fs from 'fs';
import ru from "../langs/ru.json"
import telegramMessageParser, {IParsedMessage} from "./functions/telegramMessageParser";
import BotUser, {IMapUserProps} from "../classes/BotUser";
import {conversations, eventHandler, mySQLConnection, telegramBot} from "../bot";
const request = require('request');

const download = function (uri: any, filename: any, pathName: any, callback: any = function () {
}) {
    request.head(uri, async function (err: any, res: any, body: any) {
        await request(uri).pipe(fs.createWriteStream(`src/${pathName}/${filename}.${uri.split('.').pop()}`)).on('close', callback);
    });
};


export default function runTelegramBot() {
    const telegram = new Telegram(config.TelegramToken);

    telegramBot.start((ctx) => ctx.reply('Welcome'));
    telegramBot.help((ctx) => ctx.reply('Send me a sticker'));

    telegramBot.on('sticker', (ctx) => telegram.getFileLink(ctx.message?.sticker.file_id).then(async (photoURL) => {
        download(photoURL.href, ctx.message?.sticker.file_id, "stickerCache", function () {
            eventHandler.emit('stickerSend', `stickerCache/${ctx.message?.sticker.file_id}.${photoURL.href.split('.').pop()}`);
        });
    }));

    eventHandler.on("discordMsg", (Msg, chatId) => {
        telegram.sendMessage(chatId, Msg);
    });

    telegramBot.on('message', async (ctx) => {
        if(!conversations.has(String(ctx.message.chat.id))){
            ctx.reply("You have not started searching yet!")
        }else{
            const user = conversations.get(String(ctx.message.chat.id));
            switch (user.type){
                case "TELEGRAM":{
                    ctx.copyMessage(user.id);
                    break;
                }
                case "DISCORD":{
                    const downloadEm = new EventEmitter();
                    telegramMessageParser(ctx, telegram, downloadEm).then(obj=>{
                        eventHandler.emit("telegramMessage", obj, user.id);
                    });
                    break;
                }
            }
        }

    });

    telegramBot.launch().then(() => {
        console.log("Launched Telegram Bor")
    });
}
