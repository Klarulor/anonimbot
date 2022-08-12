import runDiscordBot from "./discord/index";
import runTelegramBot from "./telegram";
import config from "../config.json";
import {Telegraf} from "telegraf";
import {Client, GatewayIntentBits, Partials} from "discord.js";
import EventEmitter from 'events';
import {MysqlKlaruConnection} from "klaru-mysql-wrapper/dist";
import {compactOptions} from "telegraf/typings/core/helpers/compact";
import BotUser, {IBotUserProps, IMapUserProps} from "./classes/BotUser";


export const mySQLConnection = new MysqlKlaruConnection();
export const userCache: Map<string, BotUser> = new Map()
export const query: BotUser[] = [];
export const conversations: Map<string, IMapUserProps> = new Map();
export const telegramBot = new Telegraf(config.TelegramToken);
export const eventHandler = new EventEmitter();
export const discordBot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    partials:[
        Partials.Channel
    ]
});



mySQLConnection.connect(config.SQLHost, +config.SQLPort, config.SQLUserName, config.SQLPassword, config.SQLDatabase, async ()=>{
    console.log("Connected to MySQL");
    // const data = await mySQLConnection.reqQuery("SELECT * FROM discord WHERE userid = ?", '542545442352453453');
    // console.log(data);
    conversations.set("390561515054563328", {
       id: "1219632518",
       type: "TELEGRAM"
    });
    conversations.set("1219632518", {
        id: "390561515054563328",
        type: "DISCORD"
    });
    runDiscordBot();
    runTelegramBot();
});



