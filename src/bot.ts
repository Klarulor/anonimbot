import runDiscordBot from "./discord/index";
import runTelegramBot from "./telegram";
import config from "../config.json";
import {Telegraf} from "telegraf";
import {Client, GatewayIntentBits, Partials} from "discord.js";
import EventEmitter from 'events';
import {MysqlKlaruConnection} from "klaru-mysql-wrapper/dist";
import BotUser, {IMapUserProps} from "./classes/BotUser";


export const mySQLConnection = new MysqlKlaruConnection();
export const userCache: Map<string, BotUser> = new Map()
export const query: BotUser[] = [];
export const conversations: Map<string, IMapUserProps> = new Map();
export const telegramBot = new Telegraf(config.TelegramToken);
export const eventHandler = new EventEmitter();
export const discordBot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
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
    console.log("Connected to MySQL!");
    runDiscordBot();
    runTelegramBot();
});



